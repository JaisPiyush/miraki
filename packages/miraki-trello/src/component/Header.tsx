import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

function Header() {
  return (
    <>
      <div style={{justifyContent: 'end' , display: 'flex' , marginTop: '30px'}}>
        <Input type="input" placeholder="Search" style={{ width: '20%', minWidth: '200px' }} />
      </div>
      <div className='flex items-center justify-center px-5 md:py-5'>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
        <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Hello there,
            </p>
            <p className="text-sm text-muted-foreground">
            Gpt is Summarising your tasks </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
