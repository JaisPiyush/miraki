import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    Avatar,
    AvatarImage,
  } from "@/components/ui/avatar"


  interface CardDemoProps extends React.ComponentProps<typeof Card> {
    title: string;
    members: string;
    avatarUrl?: string;
    isMyspace?: boolean
  }
export function CardDemo({ className, title, members, avatarUrl, isMyspace,  ...props }: CardDemoProps) {
  return (
    <Card className={cn("w-[100%]", className)} {...props} style={{paddingBottom: '10px', paddingTop: '10px'}}>
      <CardHeader style={{alignItems: 'center'}}>
        <CardTitle style={{textAlign: 'center', marginBottom: '5px'}}>{title}</CardTitle>
        <CardDescription style={{textAlign: 'center'}}>{members}</CardDescription>
        <Avatar style={{ marginTop: '20px', width: '50%', height: 'auto'}}>
      <AvatarImage src={avatarUrl ? avatarUrl : "https://github.com/shadcn.png"} alt="@shadcn" />
    </Avatar>
      </CardHeader>
  
      <CardFooter style={{justifyContent: 'center'}}>
        {!isMyspace && <Button className="w-[70%]">
           Join
        </Button>}
      </CardFooter>
    </Card>
  )
}
