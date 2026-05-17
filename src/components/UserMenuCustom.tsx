"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center outline-none">
          <img
            src={user.imageUrl}
            alt="user"
            className="w-[30px] h-[30px] rounded-full"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[170px]"  align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <button className="flex items-center gap-3 w-full" 
              onClick={() => { router.push("/dashboard")}}>
              <LayoutDashboard size={18} /> Dashboard
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button className="flex items-center gap-3 w-full" 
              onClick={() => { router.push("/account")}}>
              <Settings size={18} /> Manage account
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button className="flex items-center gap-3 w-full" onClick={() => signOut()}>
              <LogOut size={18} /> Sign out
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}