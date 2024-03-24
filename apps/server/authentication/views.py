from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from . import serializers
from . import models
from shared.auth import wallet_authentication
from rest_framework.authtoken import models as token_models
from django.contrib.auth import get_user_model
from django.db.models import QuerySet
from rest_framework import permissions as rf_permissions

from space import models as space_models
from django.db import IntegrityError, transaction


# Create your views here.

class Web3LoginAPIView(APIView):
    authentication_classes = []
    permission_classes = [rf_permissions.AllowAny, ]
    serializer_class = serializers.LoginSerializer

    def post(self, request: Request, **kwargs) -> Response:
        serializer: serializers.LoginSerializer  = self.serializer_class(data=request.data)
        if (not serializer.is_valid()):
            return Response({'detail': serializer.errors}, status=status.HTTP_403_FORBIDDEN)
        data = serializer.validated_data
        if data['login_type'] != 'web3':
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        payload = data['web3_payload']
        if not wallet_authentication.authenticate_wallet_login_data(data['web3_payload']):
            return Response({}, status=status.HTTP_403_FORBIDDEN)
        
        user_public_key_queryset: QuerySet[models.UserPublicKey] = models.UserPublicKey.objects.filter(
            public_key = payload['public_key'],
            network = payload['network']
        )
        if user_public_key_queryset.exists() \
            and (user_public_key := user_public_key_queryset.first()) is not None:
            (token, _) = token_models.Token.objects.get_or_create(user=user_public_key.user)
            return Response({
                "public_key": user_public_key.public_key,
                "network": user_public_key.network,
                "token": str(token)
            }, status = status.HTTP_202_ACCEPTED)
        
        user_model = get_user_model()

        try:
            with transaction.atomic():
                user = user_model.objects.create(
                    username=payload['public_key']
                )
                profile: models.Profile = models.Profile.objects.create(
                    user=user
                )

                space_models.Space.objects.create_personal_space(profile)


                user_public_key: models.UserPublicKey = models.UserPublicKey.objects.create(
                    user=user,
                    profile=profile,
                    public_key=payload['public_key'],
                    network=payload['network']
                )

                token = token_models.Token.objects.create(user=user)
                return Response({
                        "public_key": user_public_key.public_key,
                        "network": user_public_key.network,
                        "token": str(token)
                    }, status = status.HTTP_202_ACCEPTED)
        except IntegrityError as e:
            return Response({
                'detail': str(e)
            }, status = status.HTTP_400_BAD_REQUEST)


class ProfileAPIView(APIView):
   
    def get(self, request: Request, **kwargs):
        profile: models.Profile = request.profile
        user_public_keys = models.UserPublicKey.objects.filter(profile=profile)
        serializer = serializers.CompleteProfileFetchSerialize(
            {
                'profile': profile,
                'user_public_keys': user_public_keys
            }
        )
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
    
    def delete(self, request: Request):
        profile: models.Profile = request.profile
        tokens: QuerySet = token_models.Token.objects.filter(user=profile.user)
        tokens.delete()
        profile.user.delete()
        return Response({}, status=status.HTTP_205_RESET_CONTENT)

    
class UserPublicKeyAPIView(APIView):
    
    def post(self, request: Request, **kwargs) -> Response:
        profile: models.Profile = request.profile
        data = request.data
        if not wallet_authentication.authenticate_wallet_login_data(data):
            return Response({}, status=status.HTTP_403_FORBIDDEN)
        if models.UserPublicKey.objects.filter(public_key=data['public_key'], network=data['network'], profile=profile).exists():
            return Response({'detail': 'Wallet already exists.'}, status=status.HTTP_409_CONFLICT)
        user_public_key = models.UserPublicKey(
            user = profile.user,
            profile = profile,
            public_key = data['public_key'],
            network = data['network']
        )
        user_public_key.save()
        serializer = serializers.UserPublicKeySerializer(user_public_key)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
