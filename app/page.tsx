import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {auth} from "@/lib/auth"
import { headers } from "next/headers";

export default async function App() {
  const session = await auth.api.getSession({
    headers: await headers (),
     
  })
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
          <Button>Login </Button>
        </>
      )}
    </div>
  )
}