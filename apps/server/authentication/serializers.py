from rest_framework import serializers
from django.contrib.auth import models as auth_models
from . import models

class Web3LoginPayloadSerializer(serializers.Serializer):
    network = serializers.CharField()
    public_key = serializers.CharField()
    message = serializers.CharField()
    signature = serializers.CharField()

class LoginSerializer(serializers.Serializer):
    login_type = serializers.ChoiceField(choices=['web3'])
    web3_payload = Web3LoginPayloadSerializer(allow_null=True)

    def validate(self, attrs):
        validated_data =  super().validate(attrs)
        if validated_data['login_type'] == 'web3':
            if validated_data['web3_payload'] is None:
                raise serializers.ValidationError('web3_payload cannot be null')
        return validated_data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = auth_models.User
        fields = ('username', 'first_name', 'last_name')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = models.Profile
        fields = '__all__'

class UserPublicKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserPublicKey
        exclude = ['id', 'user', 'profile']




class CompleteProfileFetchSerialize(serializers.Serializer):
    profile = ProfileSerializer()
    user_public_keys = UserPublicKeySerializer(many=True)