'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default function Home() {
  const router = useRouter();
  const { isLoading, error, user } = db.useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isLoading || !user) { return null; }

  if (error) {
    console.warn(error)
    return (
      <div>
        Uh-oh, something went wrong!
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      Hello {user.email}!
      <Button onClick={() => db.auth.signOut()}>Sign out</Button>
    </div>
  );
}
