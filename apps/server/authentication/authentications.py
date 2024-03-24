from rest_framework import authentication
from rest_framework import exceptions
from rest_framework.request import Request
from . import models

class ProfileAuthentication(authentication.TokenAuthentication):

    def authenticate(self, request: Request):
        res = super().authenticate(request)
        if res is None:
            return res
        if res[0] is None:
            raise exceptions.AuthenticationFailed('user authentication failed')
        try:
            user = res[0]
            profile: models.Profile = models.Profile.objects.prefetch_related('user').get(user=user)
            setattr(request, 'profile', profile)
            return (user, None)
        except Exception as e:
            raise exceptions.AuthenticationFailed(e)