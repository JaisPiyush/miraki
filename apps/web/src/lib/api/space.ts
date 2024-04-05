import { api } from "./base"
import { Space, SpaceSettings } from "./types"

const SELECTED_SPACE_KEY_NAME = 'space_id'

export const getSpaceIdFromStorage = () => {
    return parseInt(window.localStorage.getItem(SELECTED_SPACE_KEY_NAME))
}

export const storeSpaceInStorage = (spaceId: number) => {
    window.localStorage.setItem(SELECTED_SPACE_KEY_NAME, spaceId.toString());
    window.miraki.spaceId = spaceId;
}

export const fetchProfileSpaces = async () => {
    const res = await api.get<Space[]>('space/profile/');
    console.log(res.data);
    return res.data;
}

export const joinSpace = async (spaceId: number) => {
    const res = await api.put<Space>(`space/profile/${spaceId}/join/`);
    return res.data;
}

export const fetchAllSpaces = async () => {
    const res = await api.get<Space[]>('space/');
    return res.data;
}

export const updateSpaceSettings = async (spaceId: number, settings: SpaceSettings) => {
    const res = await api.patch<Space>(`space/profile/${spaceId}/`, {settings});
    return res.data;
}

