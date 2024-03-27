import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Proposal } from "@/components/proposal";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ModeToggle } from "@/components/ mood-toggle";

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

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterProposals(query);
  };

  const filterProposals = (query: string) => {
    const filtered = proposals.filter((proposal) => {
      return (
        proposal.title.toLowerCase().includes(query.toLowerCase()) ||
        proposal.description.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredProposals(filtered);
  };
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav className="grid gap-4 text-sm ">
              <div className="mx-auto grid w-full max-w-6xl gap-2">
                <Avatar
                  style={{
                    marginTop: "20px",
                    width: "50%",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                >
                  <AvatarImage
                    src={"https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                </Avatar>
                <h1
                  className="text-3xl font-semibold"
                  style={{ marginBottom: "-20px" }}
                >
                  Space Name
                </h1>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                  240k members
                </p>
              </div>

              <Button style={{ width: "70%", marginTop: "10px" }}>Join</Button>
            </nav>
            <div className="grid gap-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                About
              </h3>
              <small className="text-sm font-medium leading-none text-muted-foreground" style={{marginBottom: '20px'}}>
                Description of the space it will have a whole paragraph of
                details. escription of the space it will have a whole paragraph
                of details escription of the space it will have a whole
                paragraph of details escription of the space it will have a
                whole paragraph of details escription of the space it will have
                a whole paragraph of details escription of the space it will
                have a whole paragraph of details
              </small>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Proposals
              </h3>{" "}
              <Input
                type="input"
                placeholder="Search a proposal"
                style={{ width: "30%", minWidth: "200px" }}
                onChange={handleSearchChange}
              />
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
        </main>
      </div>
    </>
  );
}
