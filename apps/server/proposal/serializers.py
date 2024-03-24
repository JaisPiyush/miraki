from rest_framework import serializers
from . import models


class ProposalSerializer(serializers.ModelSerializer):
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



class ProposalVoteSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = models.ProposalVote
        fields = '__all__'
    

    def validate(self, attrs):
        validated_data =  super().validate(attrs)
        _proposal = models.Proposal.objects.get(pk=validated_data['proposal'])
        if validated_data['vote_selected_option'] not in _proposal['options']:
            raise serializers.ValidationError('not a valid option')
        return validated_data
    