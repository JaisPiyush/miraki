export interface Profile {
    id: string | number;
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

export interface SpaceSettings extends  Record<string, unknown>{
    apps: string[];
}

export interface Space {
    id?: number;
    name: string;
    private: boolean;
    about?: string;
    avatar?: string;
    members_count: number;
    active_proposals: number;
    proposals_count: number;
    creator: Profile;
    settings: SpaceSettings
}