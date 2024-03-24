from django.db import models
from authentication import models as auth_models
# Create your models here.



class SpaceBaseManager(models.Manager):
    def create_personal_space(self, profile: auth_models.Profile) -> 'Space':
        space = self.create(
            name='personal_space',
            private = True,
            creator=profile,
        )
        return space



class Space(models.Model):
    name = models.CharField(max_length=32)
    private = models.BooleanField(default=True)
    about = models.TextField(blank=True, null=True)
    avatar = models.URLField(null=True)
    members = models.ManyToManyField(auth_models.Profile, related_name='space_members')
    memberCounts = models.IntegerField(default=0)
    activeProposals = models.IntegerField(default=0)
    proposalCounts = models.IntegerField(default=0)
    creator = models.ForeignKey(
        auth_models.Profile,
        on_delete=models.SET_NULL,
        null=True,
        related_name='space_creator'
    )

    objects: SpaceBaseManager = SpaceBaseManager()




