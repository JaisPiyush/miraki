import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

import { Checkbox } from "./ui/checkbox"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "./ui/accordion"
import MDEditor from "@uiw/react-md-editor";
import { Proposal } from "@/types";


export function ProposalComponent({title, description , options, ...props }: Proposal) {
  const now = new Date(Date.now())
  const endDate = new Date(props.end_timestamp);
  const isLive = now < endDate
  return (
    <Card className="max-w-screen-md w-screen">
    <CardHeader>
      <CardTitle style={{marginBottom: '15px'}} className="w-full flex justify-between">{title} 
        {isLive
          ? <Button variant={'outline'} className="text-sm text-green-400 border border-green-400" >
              Online
            </Button>
          :<></>
        }
        </CardTitle>
      <CardDescription>
          <MDEditor.Markdown
            // className="tracking-tight w-md-editor-show-live"
            // height={600}
            source={description || ''}
            data-color-mode={(localStorage.getItem("theme") || undefined) as any}
            style={{'padding': '1rem'}}
        
          />
      </CardDescription>
    </CardHeader>
    <CardContent>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Cast your vote</AccordionTrigger>
        <AccordionContent>
        <form className="flex flex-col gap-4">
         {options.map((option, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <Checkbox id={`option-${index}`} />
              <label
                htmlFor={`option-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
      </form>
      <Button style={{marginTop: '30px'}}>Vote</Button>

        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </CardContent>

  </Card>
  )
}
