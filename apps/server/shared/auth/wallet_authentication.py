from nacl.signing import VerifyKey
import base58
from ..serializers import WalletAuthenticationSerializer

def authenticate_wallet_login_data(data) -> bool:
    serializer = WalletAuthenticationSerializer(data=data)
    if not serializer.is_valid():
        return False
    pub_key_bytes = bytes(serializer.validated_data['public_key'], 'utf8')
    message_bytes = bytes(serializer.validated_data['message'], 'utf8')
    signature_bytes = bytes(serializer.validated_data['signature'], 'utf8')

    try:
        VerifyKey(base58.b58decode(pub_key_bytes)).verify(smessage=message_bytes, signature=base58.b58decode(signature_bytes))
        return True
    except Exception:
        return False

