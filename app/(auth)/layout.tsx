'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen 2xl p-4">
        <nav className="flex justify-between items-center">
          <img src="/logo.svg" alt="Logo" style={{ height: "50px", width: "100px" }} />
          <Button asChild variant="secondary">
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
