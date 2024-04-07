import { Proposal } from '@/types'
import {Axios} from 'axios'



export const fetchProposals = async (api: Axios, spaceId: number) => {
    const res = await api.get<Proposal[]>(`proposal/space/${spaceId}`);
    console.log(res.data)
    return res.data;
}

const getFormatedDate = (d: Date): string => {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

export const createProposal = async (api: Axios, proposal: Proposal) => {
    if (proposal.start_timestamp instanceof Date) {
        proposal.start_timestamp = getFormatedDate(proposal.start_timestamp)
    }
    if (proposal.end_timestamp instanceof Date) {
        proposal.end_timestamp = getFormatedDate(proposal.end_timestamp)
    }
    const res = await api.post('proposal/space/', proposal);
    return res.data;
}


export const search = async (api: Axios, spaceId: number, searchText: string) => {
    const res = await api.get<Proposal[]>(`proposal/space/${spaceId}/?search='${searchText}'`)
    return res.data;
}