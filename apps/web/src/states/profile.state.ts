import {createContext } from "react"
import { action, makeAutoObservable, observable } from "mobx"
import { getProvider } from "@/lib/utils";
import { hasAuthenticationToken } from "@/lib/api/base";
import { fetchProfile, login } from "@/lib/api/auth";
import {encode} from 'base58-universal';
import { ConnectionStatus, Profile, UserPublicKey } from "@/lib/api/types";







export class ProfileState {
    profile?: Profile;
    userPublicKeys: UserPublicKey[] = [];
    isConnected: boolean = false;
    connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;
    publicKey?: string;

    constructor() {
        makeAutoObservable(this, {
            profile: observable,
            userPublicKeys: observable,
            isConnected: observable,
            connectionStatus: observable,
            setIsConnected: action,
            setProfile: action,
            setUserPublicKeys: action,
            login: action,
            setConnectionStatus: action
        })
    }

    setConnectionStatus(status: ConnectionStatus) {
        this.connectionStatus = status;
    }

    setIsConnected(val: boolean) {
        this.isConnected = val;
    }

    setProfile(profile: Profile) {
        this.profile = profile;
    }

    setUserPublicKeys(publicKeys: UserPublicKey[]) {
        this.userPublicKeys = publicKeys;
    }

    async login() {
        this.connectionStatus = ConnectionStatus.Connecting;
        if (this.isConnected) {
            return;
        }
        const provider = getProvider();
        try {
            const resp = await provider.connect();
            const address: string = resp.publicKey.toString();
            if (!hasAuthenticationToken()) {
                const message = `Signing with address ${address} on timestamp ${Date.now()}`;
                const encodedMessage = new TextEncoder().encode(message);
                const signedMessage = await provider.signMessage(encodedMessage, "utf8");
                await login(address, message, encode(signedMessage.signature));
            }
            await this.fetchProfile();
            this.isConnected = true;
            this.publicKey = address;
            this.connectionStatus = ConnectionStatus.Connected

        } catch (err) {
            this.isConnected = false;
            this.publicKey = undefined;
            this.connectionStatus = ConnectionStatus.Disconnected;
            throw err;
        }

    }

    async fetchProfile() {
        const profile = await fetchProfile();
        this.profile = profile.profile;
        this.userPublicKeys = profile.user_public_keys;
    }

    
}


export const ProfileStateContext = createContext<ProfileState>(
    new ProfileState()
)
