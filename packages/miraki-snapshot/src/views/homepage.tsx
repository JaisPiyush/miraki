import { CardDemo } from "@/components/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  CardContainer,
  HeaderContainer,
  InputContainer,
  NoDataContainer,
  NoDataText,
} from "./homepage.styles";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CardData {
  title: string;
  members: string;
  url?: string;
}

const JoinSpace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tabMain, setTabMain] = useState("joinspace");

  const [filteredData, setFilteredData] = useState<CardData[]>([]);
  const cardDataAllspace = [
    {
      title: "Space 1",
      members: "100k member",
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAA4CAMAAAC49krEAAAAaVBMVEXXGSH////VAADXFh7SAADVAATWDxnYHyf87+/ZKTDkeXzgX2Pvtbfkd3rtqqvWCRXaMTfcRUr0zc7xv8HWAA3rnZ/lgIP219jso6XcSk7++Pj65+jib3L43t/okJLdUVXbOj/gZmnmiYuec/tfAAABmklEQVRIie2Tba+jIBCFnQMKCIiiYH3X/v8fudhtb+4mu/Z+3aQnMQR8mHHOjFn20UcfffRNBUvPTzitWG5/QGJpeavYG4p1wDxpwjsuC4tfeXwLwsRakngLOrvZ7N5X9i0Y0QWOWzkhY1d1OxukMa0Om83FdkF29yFxpVAT1+1FerbpPpxqaW3b2P0TLPS2ylMj2Tpe1MOaWQ2q0bC091d1s+bwo5fhtMdfgsrDqhn3UvLZXYAZplZrPetgcZk6hZyIyGBIN/4C5kD+NJehrsUxSpoYO0fkD7nKtEY7lnrGGKtH4FgPpE/MVXFO+1cv0Uo1lE3NNOodTXQaDfYN3a3asWXOza/M1Rh3HGTI91Rq4rLvY+XNTkb7OA5jDN0LtLEbiAfJ+/QaS8XBjeRk0yE1qTj2BCV3xUAIE/cP8IbDp0Mq79TO0OOCLxDYHuAZkS83Pg7rCW7UQUDQb/O7QN5PNTX31Lhe0OA973tDkBU3iylNvz7nyAmlCseUE6JQBTKX/muRC5FWiMzl+Jo39nT35fFj/bb/X/QL0mIYplnAD9gAAAAASUVORK5CYII=",
    },
    { title: "Space 2", members: "170k member" },
    { title: "Space 3", members: "150k member" },
    { title: "Space 4", members: "140k member" },
    { title: "Space 5", members: "20k member" },
  ];

  const cardDataAllMyspace = [
    {
      title: "My Space 1",
      members: "100k member",
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAA4CAMAAAC49krEAAAAaVBMVEXXGSH////VAADXFh7SAADVAATWDxnYHyf87+/ZKTDkeXzgX2Pvtbfkd3rtqqvWCRXaMTfcRUr0zc7xv8HWAA3rnZ/lgIP219jso6XcSk7++Pj65+jib3L43t/okJLdUVXbOj/gZmnmiYuec/tfAAABmklEQVRIie2Tba+jIBCFnQMKCIiiYH3X/v8fudhtb+4mu/Z+3aQnMQR8mHHOjFn20UcfffRNBUvPTzitWG5/QGJpeavYG4p1wDxpwjsuC4tfeXwLwsRakngLOrvZ7N5X9i0Y0QWOWzkhY1d1OxukMa0Om83FdkF29yFxpVAT1+1FerbpPpxqaW3b2P0TLPS2ylMj2Tpe1MOaWQ2q0bC091d1s+bwo5fhtMdfgsrDqhn3UvLZXYAZplZrPetgcZk6hZyIyGBIN/4C5kD+NJehrsUxSpoYO0fkD7nKtEY7lnrGGKtH4FgPpE/MVXFO+1cv0Uo1lE3NNOodTXQaDfYN3a3asWXOza/M1Rh3HGTI91Rq4rLvY+XNTkb7OA5jDN0LtLEbiAfJ+/QaS8XBjeRk0yE1qTj2BCV3xUAIE/cP8IbDp0Mq79TO0OOCLxDYHuAZkS83Pg7rCW7UQUDQb/O7QN5PNTX31Lhe0OA973tDkBU3iylNvz7nyAmlCseUE6JQBTKX/muRC5FWiMzl+Jo39nT35fFj/bb/X/QL0mIYplnAD9gAAAAASUVORK5CYII=",
    },
    { title: "My Space 2", members: "170k member" },
    { title: "My Space 3", members: "150k member" },
    { title: "My Space 4", members: "140k member" },
    { title: "My Space 5", members: "20k member" },
  ];

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredSpaces = (tabMain === 'joinspace' ? cardDataAllspace : cardDataAllMyspace).filter((space) =>
      space.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredSpaces);
  };

  const onClickJoinSpace = () => {
    setTabMain("joinspace");
    setSearchQuery("");
  }
  const onClickMySpace = () => {
    setTabMain("myspaces");
    setSearchQuery("");
  }
  return (
    <>
      <div
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingBottom: "150px",
          paddingTop: '50px'
        }}
      >
        <Tabs defaultValue="joinspace">
          <TabsList className="grid w-full grid-cols-2" style={{marginBottom: '20px'}}>
            <TabsTrigger value="joinspace" onClick={onClickJoinSpace}>Join a space</TabsTrigger>
            <TabsTrigger value="myspaces"  onClick={onClickMySpace}>My spaces</TabsTrigger>
          </TabsList>
          <InputContainer>
            <Input
              type="input"
              placeholder="Search a space"
              style={{ width: "20%", minWidth: "200px" }}
              onChange={handleSearchInputChange}
              value={searchQuery}
            />
          </InputContainer>
          <TabsContent value="joinspace">
            {(searchQuery ? filteredData : cardDataAllspace).length === 0 ? (
              <NoDataContainer
                style={{ justifyContent: "center", display: "flex" }}
              >
                <NoDataText
                  className="text-lg font-semibold"
                  style={{ alignContent: "center", marginTop: "50px" }}
                >
                  No matching spaces found.
                </NoDataText>
              </NoDataContainer>
            ) : (
              <CardContainer>
                {(searchQuery ? filteredData : cardDataAllspace).map(
                  (space: CardData, index: number) => (
                    <CardDemo
                      key={index}
                      title={space.title}
                      members={space.members}
                      avatarUrl={space?.url}
                      isMyspace={false}

                    />
                  )
                )}
              </CardContainer>
            )}
          </TabsContent>
          <TabsContent value="myspaces">
            {(searchQuery ? filteredData : cardDataAllMyspace).length === 0 ? (
              <NoDataContainer
                style={{ justifyContent: "center", display: "flex" }}
              >
                <NoDataText
                  className="text-lg font-semibold"
                  style={{ alignContent: "center", marginTop: "50px" }}
                >
                  No matching spaces found.
                </NoDataText>
              </NoDataContainer>
            ) : (
              <CardContainer>
                {(searchQuery ? filteredData : cardDataAllMyspace).map(
                  (space: CardData, index: number) => (
                    <CardDemo
                      key={index}
                      title={space.title}
                      members={space.members}
                      avatarUrl={space?.url}
                      isMyspace={true}
                    />
                  )
                )}
              </CardContainer>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default JoinSpace;
