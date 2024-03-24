# from rest_framework.response import Response
from rest_framework.request import Request
# from rest_framework import status
from rest_framework import generics, viewsets, permissions as rf_permissions

from space import permissions as space_permissions
from . import serializers
from . import models

# Create your views here.


class SpaceReadOnlyViewSet(viewsets.ModelViewSet):

    authentication_classes = []
    permission_classes = [rf_permissions.AllowAny]
    serializer_class = serializers.ProposalSerializer

    def get_queryset(self):
        # Very bad workaround
        space_pk = self.request.space_pk
        print(space_pk)
        return models.Proposal.objects.filter(space__pk=space_pk)
    
    def list(self, request, *args, **kwargs):
        setattr(request, 'space_pk', kwargs['space_pk'])
        return super().list(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
        setattr(request, 'space_pk', kwargs['space_pk'])
        return super().retrieve(request, *args, **kwargs)

class CreateSpaceAPIView(generics.CreateAPIView):
    queryset = models.Proposal.objects.all()
    serializer_class = serializers.ProposalSerializer