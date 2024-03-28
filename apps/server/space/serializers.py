from rest_framework import serializers

from . import models


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Space
        exclude = ['members']
        read_only_fields = ['members', 
                            'members_count', 
                            'active_proposals',
                            'proposals_count',
                            'creator',
                            'id'
                    ]
    
    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].profile
        return super().create(validated_data)

class RestrictedSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Space
        exclude = ['settings', 'members', 'active_proposals','proposals_count','creator',]
