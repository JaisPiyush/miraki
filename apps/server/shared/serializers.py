from rest_framework import serializers

class WalletAuthenticationSerializer(serializers.Serializer):
    public_key = serializers.CharField()
    message = serializers.CharField()
    signature = serializers.CharField()