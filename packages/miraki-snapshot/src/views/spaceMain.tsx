
import { Proposal } from "../components/proposal";
import { useState } from "react";


interface Proposal {
  title: string;
  description: string;
  options: string[];
}

export function SpaceView() {
  const proposals = [
    {
      title: "Proposal Title 1",
      description:
        "Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1 Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1.",
      options: ["sandesh", "rajat", "piyus"],
    },
    {
      title: "Proposal Title 2",
      description:
        "Description of the space for proposal 2. It will have a whole paragraph describDescription of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1ing the space for proposal 2.",
      options: ["john", "smith", "jane"],
    },
    {
      title: "Proposal Title 3",
      description:
        "Description of the space for proposal 3. It willDescription of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1 have a whole paragraph describing the space for proposal 3.",
      options: ["alice", "bob", "charlie", "charlie"],
    },
    {
      title: "Proposal Title 4",
      description:
        "Description of the space for proposal 3. It wiDescription of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1Description of the space for proposal 1. It will have a whole paragraph describing the space for proposal 1ll have a whole paragraph describing the space for proposal 3.",
      options: ["alice", "bob", "charlie"],
    },
  ];

  const [searchQuery,] = useState<string>("");
  const [filteredProposals,] = useState<Proposal[]>([]);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);
  //   filterProposals(query);
  // };

  // const filterProposals = (query: string) => {
  //   const filtered = proposals.filter((proposal) => {
  //     return (
  //       proposal.title.toLowerCase().includes(query.toLowerCase()) ||
  //       proposal.description.toLowerCase().includes(query.toLowerCase())
  //     );
  //   });
  //   setFilteredProposals(filtered);
  // };
  return (
    <>
      <div className="flex justify-center min-h-screen w-full pb-10 pt-20">
        <div className="flex flex-col w-full max-w-screen-md">
            {(searchQuery ? filteredProposals : proposals).map(
                  (proposal, index) => (
                    <Proposal
                      key={index}
                      title={proposal.title}
                      description={proposal.description}
                      options={proposal.options}
                    />
                  )
            )}
        </div>
      </div>
    </>
  );
}
