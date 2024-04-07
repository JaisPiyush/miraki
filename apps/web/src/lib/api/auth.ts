
import { api } from "./base"
import { Profile, UserPublicKey } from "./types"


interface LoginResponse {
    public_key: string,
    network: string,
    token: string
}

export interface ProfileResponse {
    profile: Profile;
    user_public_keys: UserPublicKey[];
}

export const login = async (
    address: string, 
    message: string, 
    signature: string,
    ) => {
        const res = await api.post<LoginResponse>('auth/login/web3/',
        {
            login_type: 'web3',
            web3_payload: {
                network: 'solana',
                public_key: address,
                message: message,
                signature
            }
        }
        
        )
        if (res.status === 202) {
            window.localStorage.setItem('auth_token', res.data.token);
            // Reload the entire site so that Axios instance can pick up the auth_token
            location.reload();
        }
}


export const fetchProfile = async () => {
    const res = await api.get<ProfileResponse>('auth/')
    return res.data;
}

