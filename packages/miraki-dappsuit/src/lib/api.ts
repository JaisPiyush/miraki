import {Axios, AxiosError} from 'axios';
import {miraki} from '@miraki/miraki-core'
import { miraki_dappsuit } from '@/miraki_dappsuit';

export interface SpaceAppTreeNode extends miraki.TreeNode.TreeNodeOptions {
    space: number;
    app_id: string;
    parent_node?: string;

}

export const getSha256Hash = async (message: string) => {
    const encoder = new TextEncoder()
    const encoded = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-256', encoded)
    const hashArray = Array.from(new Uint8Array(hash)); // convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
    return hashHex;
}

export const fetchSidebarNodes = async(api: Axios, spaceId: number, appId: string) => {
    const res = await api.get<SpaceAppTreeNode[]>(`space/${spaceId}/app/${appId}/node/`);
    return res.data;
}


export const createSidebarNode = async (api: Axios, node: SpaceAppTreeNode) => {
    try {
        const res = await api.post<SpaceAppTreeNode>('space/node/', node)
        return res.data;
    } catch (e) {
       if (e instanceof AxiosError) {
            throw new Error(e.response?.data)
        } else {
            throw e;
        }
       
    }
}



export const removeSidebarNode = async (api: Axios, id: string) => {
    try {
        const res = await api.delete(`space/node/${id}/`)
        return res.data;
    } catch (e) {
       if (e instanceof AxiosError) {
            throw new Error(e.response?.data)
        } else {
            throw e;
        }
       
    }
}

export interface SolanaProgramIdl extends miraki_dappsuit.solana.Idl {
    id?: string;
    space: number;
}

export const getSolanaIdlProgramById = async (api: Axios, id: number) => {
    const res = await api.get<SolanaProgramIdl>(`dappsuit/programs/solana/${id}/`);
    return res.data;
}

export const searchSolanaProgramIdl = async (api: Axios, spaceId: number, searchText: string) =>{
    const res = await api.get<SolanaProgramIdl[]>(`dappsuit/spaces/${spaceId}/programs/solana/?search='${searchText}'`)
    return res.data;
}

export const createSolanaIdlProgram = async (api: Axios, app_id: string, program: SolanaProgramIdl, parent_node?: string) => {
    try {
        // program.id = `${app_id}:solana:program:${getSha256Hash(JSON.stringify(program))}`
        const programRes = await api.post<SolanaProgramIdl>('dappsuit/programs/solana/', program)
        const _program = programRes.data;
        const node: SpaceAppTreeNode = {
            id: '',
            app_id,
            space: _program.space,
            parent_node,
            name: _program.name,
            description: 'Solana program',
            tooltip: 'Solana Program generated from IDL',
            command: {
                command: 'MirakiDappSuitPlugin.launchIdlProgramPage',
                kwargs: {programId: _program.id}
            }
        }

        const res = await createSidebarNode(api, node);
        return [_program, res]

    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data)
        } else {
            throw e;
        }
    }
}

export const removeSolanaProgramById = async (api: Axios, id: string, app_id: string) => {
    await removeSidebarNode(api, `${app_id}:${id}`)
    await api.delete(`dappsuit/programs/solana/${id}/`);
}