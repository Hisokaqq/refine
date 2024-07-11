import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
  
type User = {
    username: string;
    avatar: string;
}

const DropdownProfile = ({username, avatar}: User) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-9 w-9 cursor-pointer'>
              <AvatarImage src={avatar} />
              <AvatarFallback>{username.substring(0,1)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
            </DropdownMenuItem>
            
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <p className=" text-red-600">Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

export default DropdownProfile