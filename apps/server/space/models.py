import uuid

from typing import Any
from django.db import models
from authentication import models as auth_models
from django.db import transaction


# Create your models here.



class SpaceBaseManager(models.Manager):
    def create_personal_space(self, profile: auth_models.Profile) -> 'Space':
        space: 'Space' = self.create(
            name='personal_space',
            private = True,
            creator=profile,
        )      
        return space
    
    def create(self, **kwargs: Any) -> Any:
        with transaction.atomic():
            space: 'Space' =  super().create(**kwargs)
            space.add_member(space.creator)
            space.save()
            return space


class Space(models.Model):
    name = models.CharField(max_length=32)
    uid = models.CharField(max_length=255, unique=True, null=True)
    private = models.BooleanField(default=True)
    about = models.TextField(blank=True, null=True)
    avatar = models.URLField(null=True)
    members = models.ManyToManyField(auth_models.Profile, related_name='space_members')
    members_count = models.IntegerField(default=0)
    active_proposals = models.IntegerField(default=0)
    proposals_count = models.IntegerField(default=0)
    creator = models.ForeignKey(
        auth_models.Profile,
        on_delete=models.SET_NULL,
        null=True,
        related_name='space_creator'
    )
    settings = models.JSONField(default=dict)

    objects: SpaceBaseManager = SpaceBaseManager()

    def add_member(self, profile: auth_models.Profile) -> None:
        self.members.add(profile)
        self.members_count += 1

class SpaceAppTreeNode(models.Model):
    id = models.CharField(primary_key=True, max_length=255, default=uuid.uuid4, editable=False)
    app_id = models.CharField(max_length=255)
    space = models.ForeignKey(
        Space,
        on_delete=models.CASCADE,
        related_name='space_app_tree_node'
    )
    parent_node = models.ForeignKey(
        'self',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='parent_node_tree_node'
    )
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    label = models.CharField(max_length=255, null=True, blank=True)
    tooltip = models.TextField(null=True, blank=True)
    icon = models.URLField(null=True, blank=True)
    command = models.JSONField(default=dict)
    collapsible_state = models.IntegerField(null=True, default=0)
    action = models.JSONField(default=dict)
    



