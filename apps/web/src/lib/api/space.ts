import { api } from "./base"
import { Space } from "./types"

const SELECTED_SPACE_KEY_NAME = 'space_id'

export const getSpaceIdFromStorage = () => {
    return parseInt(window.localStorage.getItem(SELECTED_SPACE_KEY_NAME))
}

export const storeSpaceInStorage = (spaceId: number) => {
    window.localStorage.setItem(SELECTED_SPACE_KEY_NAME, spaceId.toString());
}

export const fetchProfileSpaces = async () => {
    const res = await api.get<Space[]>('/space/profile');
    console.log(res.data);
    return res.data;
}