from rest_framework import serializers
from . import models


class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Proposal
        field = '__all__'
    

class ProposalVoteSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = models.ProposalVote
        field = '__all__'
    

    def validate(self, attrs):
        validated_data =  super().validate(attrs)
        _proposal = models.Proposal.objects.get(pk=validated_data['proposal'])
        if validated_data['vote_selected_option'] not in _proposal['options']:
            raise serializers.ValidationError('not a valid option')
        return validated_data
    