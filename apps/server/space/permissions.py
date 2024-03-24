from rest_framework import permissions
from authentication import models as auth_models
from rest_framework.request import Request
from django.db.models import Q


from . import models

class SpaceMemberWithSpaceFieldPermission(permissions.BasePermission):

    def has_permission(self, request: Request, view):
        space_id = view.get_space_id(request)
        if space_id is None:
            raise permissions.exceptions.PermissionDenied('space field is required for permissions')
        profile: auth_models.Profile = request.profile
        return models.Space.objects.filter(
                Q(pk=space_id)
                & Q(members=profile)
            ).exists()