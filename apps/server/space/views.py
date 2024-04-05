from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, filters, permissions, views
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from django.db.models.query import Q


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
    queryset = models.Space.objects.prefetch_related('creator').all()
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

        


class SpaceAppTreeNodeDetailViews(viewsets.ModelViewSet):
                            
    serializer_class = serializers.SpaceAppTreeNodeSerializer
    queryset = models.SpaceAppTreeNode.objects.all()

    # def list(self, request, *args, **kwargs):
    #     return Response({'detail': "Method not allowed"})

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

class SpaceAppTreeNodeListView(views.APIView):

    serializer_class = serializers.SpaceAppTreeNodeSerializer
    queryset = models.SpaceAppTreeNode.objects.all()

    def get(self, request, *args, **kwargs):
        space_id = kwargs['space_id']
        app_id = kwargs['app_id']
        queryset = self.queryset.filter(Q(space=space_id) & Q(app_id=app_id))
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        data = serializer.data
        node_mapper = {}
        root_nodes = []
        for node in data:
            node_id = str(node["id"])
            parent_node = str(node["parent_node"]) if node["parent_node"] is not None else None
            if node_id not in node_mapper:
                node["children"] = []
                node_mapper[node_id] = node
            elif "id" not in node_mapper[node_id]:
                node["children"] = node_mapper[node_id]["children"]
                node_mapper[node_id] = node
            if parent_node is None:
                root_nodes.append(node_id)
            elif parent_node in node_mapper:
                node_mapper[parent_node]["children"].append(node_mapper[node_id])
                print(node_id, node_mapper[parent_node]["children"])
            else:
                node_mapper[parent_node] = {"children": []}
        nodes = []
        for node_id in root_nodes:
            if len(node_mapper[node_id]["children"]) == 0:
                node_mapper[node_id]["children"] = None
            nodes.append(node_mapper[node_id])
        return Response(nodes)
        
