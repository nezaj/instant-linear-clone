'use client';

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isLoading, error, user } = db.useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
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
