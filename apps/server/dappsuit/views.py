from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, status, generics
from django.db.models import Q
from django.contrib.postgres.search import SearchVector

from . import serializers, models

# Create your views here.

class SolanaProgramIDLViewSet(viewsets.ModelViewSet):
    queryset = models.SolanaProgramIDL.objects
    serializer_class = serializers.SolanaProgramIDLSerializer

    def list(self, request, *args, **kwargs):
        return Response({'detail': 'list method not supported'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

class SpaceSolanaProgramIDLListView(generics.ListAPIView):
    queryset = models.SolanaProgramIDL.objects
    serializer_class = serializers.SolanaProgramIDLSerializer

    def list(self, request: Request, *args, **kwargs):
        query = Q(space=kwargs['space_id'])
        if 'search' in request.query_params:
            self.queryset = self.queryset.annotate(search = SearchVector('docs_search_text', 'program_search_text'))
            query &= Q(search = request.query_params.get('search'))
        self.queryset = self.queryset.filter(query)
        return super().list(request, *args, **kwargs)


    