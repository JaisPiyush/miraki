from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, filters, permissions
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action


from . import models
from authentication import models as auth_models
from . import serializers
from authentication import serializers as auth_serializers


# Create your views here.

class ProfileSpaceViewSet(viewsets.ModelViewSet):

    serializer_class = serializers.SpaceSerializer
    # queryset = models.Space.objects

    def get_queryset(self):
        profile: auth_models.Profile = self.request.profile
        return models.Space.objects.filter(
            members=profile
        )


    def list(self, request: Request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    
    @action(detail=True, methods=['PUT'])
    def join(self, request: Request, pk=None):
        profile: auth_models.Profile = request.profile
        try:
            space: models.Space = models.Space.objects.get(pk=pk)
            if space.members.filter(pk=profile.pk).exists():
                return Response({'detail': 'Already a member'}, status=status.HTTP_409_CONFLICT)
            space.add_member(profile)
            space.save()
            serializer = self.get_serializer(space)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response({'detail': 'Space does not exists'}, status=status.HTTP_404_NOT_FOUND)
    
class SpaceViewSet(viewsets.ModelViewSet):

    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    queryset = models.Space.objects.all()
    serializer_class = serializers.SpaceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @action(detail=True, methods=['GET'])
    def members(self, request: Request, pk=None):
        space: models.Space = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = auth_serializers.ProfileSerializer(
            space.members.prefetch_related('user').all(),
            many=True
        )
        return Response(serializer.data, status = status.HTTP_200_OK)

        


