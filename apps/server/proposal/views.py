from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework import generics, viewsets, views, permissions as rf_permissions

from space import permissions as space_permissions
from . import serializers
from . import models

# Create your views here.


class SpaceReadOnlyViewSet(viewsets.ModelViewSet):

    permission_classes = [rf_permissions.AllowAny]
    serializer_class = serializers.ProposalSerializer

    def get_queryset(self):
        if self.action == 'retrieve':
            return models.Proposal.objects.prefetch_related('space').all()
        # Very bad workaround
        space_pk = self.request.space_pk
        return models.Proposal.objects.prefetch_related('space').filter(space__pk=space_pk)
    
    def list(self, request, *args, **kwargs):
        setattr(request, 'space_pk', kwargs['space_pk'])
        return super().list(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

class CreateSpaceProposalAPIView(generics.CreateAPIView):
    queryset = models.Proposal.objects.all()
    serializer_class = serializers.ProposalSerializer

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
