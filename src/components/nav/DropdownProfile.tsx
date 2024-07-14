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
import Link from "next/link";
import { SignOut } from "@/app/auth/auth.action";
  
type User = {
    name: string | null;
    pictureUrl: string | null;
}

const DropdownProfile = ({name, pictureUrl}: User) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-9 w-9 cursor-pointer'>
              <AvatarImage src={pictureUrl!} />
              <AvatarFallback>{name?.substring(0,1)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                  Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/">
              <DropdownMenuItem  className="cursor-pointer">
                  Billing
              </DropdownMenuItem>
            </Link>
            
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={async () => {await SignOut()}}>
            <p className=" text-red-600">Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

export default DropdownProfile