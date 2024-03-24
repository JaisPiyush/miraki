from django.db import models
from django.contrib.auth import models as auth_models

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(
        auth_models.User,
        on_delete=models.CASCADE,
        primary_key=True
    )
    avatar = models.URLField(null=True)

class UserPublicKey(models.Model):
    user = models.ForeignKey(
        auth_models.User,
        on_delete=models.CASCADE
    )
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE
    )
    public_key = models.CharField()
    network = models.CharField()

    class Meta:
        unique_together = ('public_key', 'network',)