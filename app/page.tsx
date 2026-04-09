'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';


export default function App() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          toast.success("Signout successfully.")
        },
      },
    });
  }

  return (
    <div>
      <Button className="cursor-pointer">Hello</Button>
      <ThemeToggle />

      {session ? (
        <>
          <p>{session.user.name}</p>
        <Button
        onClick={signOut} 
        className='cursor-pointer'>Logout</Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button className="cursor-pointer">Login</Button>
          </Link>
        </>
      )}
    </div>
  );
}
