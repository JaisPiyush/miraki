import { Axios } from "axios";

export interface Proposal {
    id?: number;
    space?: number;
    title: string;
    description?: string | null;
    options: string[];
    strategy_details: Record<string, string>;
    start_timestamp: string | Date;
    end_timestamp: string | Date;
    creator?: number;
    member_quorum: number;
    vote_selected_options_count?: Record<string, number>;
    votes_count?: number;
}

declare global {
    interface Window {
        miraki: {
            api?: Axios,
            spaceId?: number
        }
    }
}