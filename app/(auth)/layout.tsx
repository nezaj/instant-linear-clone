'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, user } = db.useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading || user) {
    return null;
  }

  const isLoginPage = pathname === "/login";

  return (
    <div className="bg-secondary min-h-screen">
      <div className="mx-auto max-w-screen 2xl p-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" style={{ height: "40px", width: "40px" }} />
            <div className="font-semibold text-primary text-2xl">QuickSync</div>
          </Link>
          <Button asChild variant="outline">
            <Link href={isLoginPage ? "/sign-up" : "/login"}>
              {isLoginPage ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
