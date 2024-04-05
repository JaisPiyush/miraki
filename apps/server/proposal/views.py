from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework import generics, viewsets, views, permissions as rf_permissions
from django.db.models import Q
from django.contrib.postgres.search import SearchVector

from space import permissions as space_permissions
from . import serializers
from . import models

# Create your views here.


class SpaceProposalReadOnlyViewSet(viewsets.ModelViewSet):

    permission_classes = [rf_permissions.AllowAny]
    serializer_class = serializers.ProposalSerializer

    queryset = models.Proposal.objects.prefetch_related('space').order_by('-id')
    
    def list(self, request: Request, *args, **kwargs):
        query = Q(space=kwargs['pk'])
        if (search := request.query_params.get('search', None)) is not None:
            self.queryset = self.queryset.annotate(search=SearchVector('title', 'description'))
            query &= Q(search=search)
        self.queryset = self.queryset.filter(query)
        return super().list(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

class CreateSpaceProposalAPIView(generics.CreateAPIView):
    queryset = models.Proposal.objects.all()
    serializer_class = serializers.CreateProposalSerializer

class CreateProposalVoteAPIView(views.APIView):

    def get_space_id(self, request: Request):
        proposal = models.Proposal.objects.get(pk=request.data.get('proposal'))
        return proposal.space_id

    permission_classes = [space_permissions.SpaceMemberWithSpaceFieldPermission]
    

    def post(self, request: Request, **kwargs) -> Response:
        request.data['profile'] = request.profile
        serializer = serializers.ProposalVoteSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response({'detail': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
