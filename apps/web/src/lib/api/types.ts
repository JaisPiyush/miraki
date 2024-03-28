export interface Profile {
    user: number
    avatar?: string;
}

export interface UserPublicKey {
    public_key: string;
    network: string;
}

export enum ConnectionStatus {
    Connected,
    Disconnected,
    Connecting
}