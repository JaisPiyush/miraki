
import { api } from "./base"


interface LoginResponse {
    public_key: string,
    network: string,
    token: string
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
        }
}