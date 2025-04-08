import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen 2xl p-4">
        <nav className="flex justify-between items-center">
          <img src="/logo.svg" alt="Logo" style={{ height: "50px", width: "100px" }} />
          <Button variant="secondary">Sign up</Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
