from django.db import models
from django.contrib.auth import models as auth_models
# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(
        auth_models.User,
        on_delete=models.CASCADE,
        primary_key=True
    )
    avatar = models.URLField()

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


class Space(models.Model):
    name = models.CharField(max_length=32)
    private = models.BooleanField(default=True)
    about = models.TextField()
    avatar = models.URLField()
    members = models.ManyToManyField(Profile)
    memberCounts = models.IntegerField(default=0)
    activeProposals = models.IntegerField(default=0)
    proposalCounts = models.IntegerField(default=0)
    creator = models.ForeignKey(
        Profile,
        on_delete=models.SET_NULL
    )


