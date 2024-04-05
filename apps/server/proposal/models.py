from django.db import models
from django.contrib.postgres import fields as postgres_fields
from space import models as space_models
from authentication import models as auth_models

# Create your models here.



class Proposal(models.Model):
    space = models.ForeignKey(
        space_models.Space,
        on_delete=models.CASCADE
    )
    title = models.TextField()
    description = models.TextField(null=True, blank=True)
    options = postgres_fields.ArrayField(models.CharField())
    strategy_details = models.JSONField()
    start_timestamp = models.DateTimeField(auto_now_add=True)
    end_timestamp = models.DateTimeField(
        
    )
    creator = models.ForeignKey(
        auth_models.Profile,
        on_delete=models.SET_NULL,
        null=True
    )
    member_quorum = models.FloatField(default=0.5)
    vote_selected_options_count = models.JSONField(default=dict)
    votes_count = models.IntegerField(default=0)


class ProposalVoteManager(models.Manager):
    def create(self, **kwargs: space_models.Any) -> 'ProposalVote':
        vote: 'ProposalVote' = super().create(**kwargs)
        proposal = vote.proposal
        proposal.votes_count += 1
        proposal.vote_selected_options_count[vote.vote_selected_option] += 1
        proposal.save()
        return vote


class ProposalVote(models.Model):
    proposal = models.ForeignKey(
        Proposal,
        on_delete=models.CASCADE
    )
    profile = models.ForeignKey(
        auth_models.Profile,
        on_delete=models.SET_NULL,
        null=True
    )

    vote_selected_option = models.CharField(max_length=255)
    
    objects: ProposalVoteManager = ProposalVoteManager()




