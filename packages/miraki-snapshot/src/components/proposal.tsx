import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Checkbox } from "./ui/checkbox"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

interface CardData {
    title: string;
    description: string;
    options: string[]; 
}
export function Proposal({title, description , options }: CardData) {
  return (
    <Card>
    <CardHeader>
      <CardTitle style={{marginBottom: '15px'}}>{title}</CardTitle>
      <CardDescription>
     {description}
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
