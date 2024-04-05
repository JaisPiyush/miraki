
import { fetchProposals } from "@/lib/api";
import { ProposalComponent } from "../components/proposal";
import { useEffect, useState } from "react";
import {CircleLoader} from 'react-spinners'
import { Proposal } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";




export function SpaceView() {
  const [showLoader, setShowLoader] = useState(true);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const {toast} = useToast()
  const [api, spaceId] = [window.miraki.api, window.miraki.spaceId]
  
  useEffect(() => {
    console.log(api, spaceId)
    if (api && spaceId) {
      setShowLoader(true)
      fetchProposals(api, spaceId)
      .then((proposals) => {
        setProposals([...proposals])
        setShowLoader(false)
      })
      .catch(() => {
        setShowLoader(false)
        toast({
          title: 'Error fetching space proposals'
        })
      })
    }
    
  }, [api, spaceId, toast])

  return (
    <>
      <div className="flex justify-center min-h-screen w-full pb-10 pt-20">
        <div className="flex flex-col items-center w-full max-w-screen-md space-y-4">
          {
            showLoader
            ? <CircleLoader color="#36d7b7" />
            : (proposals).map(
                  (proposal) => (
                    <ProposalComponent
                        key={proposal.id}
                        {...proposal}
                    />
                  )
            )}
        </div>
        <Toaster />
      </div>
    </>
  );
}
