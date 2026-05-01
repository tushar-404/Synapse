"use client"

import { BookOpen, Home, LayoutDashboardIcon, LogOut} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useSignout } from "@/hooks/use-signout"

interface iAppProps {
  name: string;
  email: string;
  image: string
}

export default function UserDropdown({name, image}: iAppProps) {
  const handleSignout = useSignout()
  return (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="relative h-10 w-10 rounded-full" variant="ghost">
        <Avatar>
          <AvatarImage alt="@haydenbleasel" src={image} />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="min-w-48">
      <DropdownMenuLabel className="font-normal">
        <span className="text-foreground truncate text-sm font-medium">
          {name}
        </span>
        <div className="text-muted-foreground truncate text-xs font-normal">
          tushar@gmail.com
        </div>

      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/">
          <Home size={16} className="opacity-60" aria-hidden="true" />
          <span>Home</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/courses">
          <BookOpen size={16} className="opacity-60" aria-hidden="true" />
          <span>Courses</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild >
        <Link href="/dashboard">
          <LayoutDashboardIcon
          size={16}
          className="opacity-60"
          aria-hidden="true"
          />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onClick={handleSignout}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

