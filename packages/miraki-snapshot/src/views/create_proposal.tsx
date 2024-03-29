import {z} from 'zod';

const proposalFormSchema = z.object({
    space: z.number(),
    title: z.string().min(2),
    description: z.string().nullable(),
    options: z.array(z.string().min(1)),
    strategy_details: z.object({}),
    // Timestamp should be sent to backend in format
    // yyyy-mm-ddTHH:MM:SS
    start_timestamp: z.string().length(19),
    end_timestamp: z.string().length(19)
})

export default function CreateProposalView() {
    return <div className="w-full h-full flex justify-center">
        <div className="w-full max-w-screen-md flex flex-col">

        </div>
    </div>
}