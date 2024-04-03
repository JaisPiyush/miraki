from django.db import models
from space import models as space_models
from django.contrib.postgres.fields import ArrayField


class SolanaProgramIDL(models.Model):
    space = models.ForeignKey(
        space_models.Space,
        on_delete=models.CASCADE,
        related_name="space_solana_program"
    )
    name = models.CharField(max_length=255)
    version = models.CharField(max_length=40, null=True, blank=True)
    docs = ArrayField(
        models.TextField(),
        null=True,
        blank=True,
        default=list
    )
    instructions = ArrayField(
        models.JSONField(default=dict),
        default=list
    )
    state = models.JSONField(null=True)
    accounts = ArrayField(
        models.JSONField(),
        null=True
    )
    types = ArrayField(
        models.JSONField(),
        null=True
    )
    events = ArrayField(
        models.JSONField(),
        null=True
    )
    errors = ArrayField(
        models.JSONField(),
        null=True
    )
    constants = ArrayField(
        models.JSONField(),
        null=True
    )
    metadata = models.JSONField(null=True)
    docs_search_text = models.TextField(default=str, blank=True, null=True)
    program_search_text = models.TextField(default=str, blank=True)

    