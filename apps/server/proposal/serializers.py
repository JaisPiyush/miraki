from rest_framework import serializers
from django.db.models import Q

from . import models
from space import serializers as space_serializers

class ProposalSerializer(serializers.ModelSerializer):

    space = space_serializers.RestrictedSpaceSerializer()
    class Meta:
        model = models.Proposal
        fields = '__all__'
        read_only_fields = [
            'creator',
            'votes_count',
            'vote_selected_options_count',
        ]
    
    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].profile
        validated_data['vote_selected_options_count'] = {key: 0 for key in validated_data['options']}
        return super().create(validated_data)

    def to_representation(self, instance):
        repr =  super().to_representation(instance)
        repr['quorum_reached'] = (repr['space']['members_count'] * repr['member_quorum']) <= repr['votes_count']
   
        if self.context['request'] is not None and self.context['request'].profile is not None:
            repr['has_voted'] = models.ProposalVote.objects.filter(
                Q(proposal=instance)
                & Q(profile=self.context['request'].profile)
            ).exists()
        return repr


class ProposalVoteSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = models.ProposalVote
        fields = '__all__'
    

    def validate(self, attrs):
        validated_data =  super().validate(attrs)
        proposal = validated_data['proposal']
        if validated_data['vote_selected_option'] not in proposal.options:
            raise serializers.ValidationError('not a valid option')
        if models.ProposalVote.objects.filter(Q(proposal=validated_data['proposal']) & Q(profile=validated_data['profile'])).exists():
            raise serializers.ValidationError('already voted for the proposal')
        return validated_data
