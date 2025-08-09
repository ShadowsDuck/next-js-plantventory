import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Image from "next/image";
import { SignOutButton } from "./buttons/sign-out-button";

export default function DropdownMenuWithIcon({ session }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {session.user.image !== null ? (
          <Avatar>
            <AvatarFallback>
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Image
              src={session.user.image || "https://github.com/shadcn.png"}
              alt={session.user.name}
              width={30}
              height={30}
              className="rounded-full"
            />

            <div>
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="h-4 w-4" /> Profile
        </DropdownMenuItem>
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
