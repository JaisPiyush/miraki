from rest_framework import permissions
from django.contrib.auth import models as auth_models
from rest_framework.request import Request
from . import models

class SpaceMemberWithSpaceFieldPermission(permissions.BasePermission):

    def has_permission(self, request: Request, view):
        space_id = request.data.get('space')
        if space_id is None:
            raise permissions.exceptions.PermissionDenied('space field is required')
        