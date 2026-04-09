"use client"

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { authClient } from "@/lib/auth-client";

export default function App() {
  const {
    data: session,
  } = authClient.useSession( )
  return (
    <div>
      <Button className="cursor-pointer">Hello</Button>
      <ThemeToggle />

      {session? (
        <p>
        session.user.name
        </p>
      ): 
      (
        <>
          <Button>Login</Button>
        </>
      )}
    </div>
  )
}