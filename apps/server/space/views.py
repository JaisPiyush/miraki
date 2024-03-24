from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.db.models.query_utils import Q
from django.db.models import QuerySet

from . import models
from authentication import models as auth_models
from . import serializers
from . import permissions

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
        return Response({
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    
    

