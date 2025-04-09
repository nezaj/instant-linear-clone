"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

import { db } from "@/lib/db";

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, user } = db.useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/");
    }
  }, [user, isLoading]);

  if (isLoading || user) {
    return null;
  }

  return (
    <LoginCard />
  );
}

const LoginCard = () => {
  const [sentEmail, setSentEmail] = useState("");

  return (
    <Card className="w-full h-full md:w-[480px] border-none shadow-none">
      <CardContent className="p-8">
        {!sentEmail ? (
          <EmailStep onSendEmail={setSentEmail} />
        ) : (
          <CodeStep sentEmail={sentEmail} />
        )}
      </CardContent>
    </Card>
  );
}

function EmailStep({ onSendEmail }: { onSendEmail: (email: string) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputEl = inputRef.current!;
    const email = inputEl.value;
    onSendEmail(email);
    db.auth.sendMagicCode({ email }).catch((err) => {
      alert("Uh oh :" + err.body?.message);
      onSendEmail("");
    });
  };
  return (
    <form
      key="email"
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4"
    >
      <h2 className="text-xl font-bold">Let's log you in</h2>
      <p className="text-gray-700">
        Enter your email to receive a verification code.
      </p>
      <input
        ref={inputRef}
        type="email"
        className="border border-gray-300 px-3 py-1  w-full"
        placeholder="Enter your email"
        required
        autoFocus
      />
      <Button type="submit">
        Send Code
      </Button>
    </form >
  );
}

function CodeStep({ sentEmail }: { sentEmail: string }) {
  const [code, setCode] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("SUBMIT!", code)
    e.preventDefault();

    if (code.length < 6) {
      toast.error("Please enter the complete verification code.");
      return;
    }

    db.auth.signInWithMagicCode({ email: sentEmail, code }).catch(() => {
      toast.error("This code is invalid. Please try again.");
    });
  };

  return (
    <form
      key="code"
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4"
    >
      <h2 className="text-xl font-bold">Enter your code</h2>
      <p className="text-gray-700">
        We sent an email to <strong>{sentEmail}</strong>. Check your email, and
        paste the code you see.
      </p>

      <div className="mx-auto">
        <InputOTP
          value={code}
          onChange={setCode}
          maxLength={6}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="size-12 text-xl" />
            <InputOTPSlot index={1} className="size-12 text-xl" />
            <InputOTPSlot index={2} className="size-12 text-xl" />
            <InputOTPSlot index={3} className="size-12 text-xl" />
            <InputOTPSlot index={4} className="size-12 text-xl" />
            <InputOTPSlot index={5} className="size-12 text-xl" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        type="submit"
        className="px-3 py-1 bg-blue-600 text-white font-bold hover:bg-blue-700 w-full"
        onClick={() => handleSubmit}
      >
        Verify Code
      </Button>
    </form>
  );
}
