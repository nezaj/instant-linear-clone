"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'sonner';
import { Loader } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { db } from "@/lib/db";

const EmailSchema = z.object({
  email: z.string().email(),
});

const CodeSchema = z.object({
  code: z.string().length(6, "Code must be 6 characters long"),
});

export default function SignUpPage() {
  return (
    <SignUpCard />
  );
}

const SignUpCard = () => {
  const [email, setEmail] = useState("");
  const [isEmailStep, setIsEmailStep] = useState(true);

  const handleSendEmail = (email: string) => {
    setEmail(email);
    setIsEmailStep(false);
  }

  const handleBack = () => {
    setIsEmailStep(true);
  }

  return (
    <Card className="w-full h-full md:w-[480px] border-none shadow-none">
      <CardContent className="p-8">
        {isEmailStep ? (
          <EmailStep onSendEmail={handleSendEmail} initialEmail={email} />
        ) : (
          <CodeStep
            email={email}
            onBack={handleBack}
          />
        )}
      </CardContent>
    </Card>
  );
}

interface EmailStepProps {
  onSendEmail: (email: string) => void;
  initialEmail: string;
}

function EmailStep({ onSendEmail, initialEmail }: EmailStepProps) {
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: initialEmail,
    },
  })

  const onSubmit = (data: z.infer<typeof EmailSchema>) => {
    onSendEmail(data.email);
    db.auth.sendMagicCode({ email: data.email }).catch((err) => {
      alert("Uh oh :" + err.body?.message);
      onSendEmail("");
    });
  }

  return (
    <Form {...form}>
      <form
        key="email"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <CardHeader>
          <CardTitle>{"Create a new account"}</CardTitle>
          <CardDescription>
            {"Enter your email and we'll send you a code to sign up."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent >
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            Send Code
          </Button>
          <CardDescription className="inline">
            Already have an account?{" "}
            <Button asChild variant="link" size="sm" className="p-0">
              <Link href="/login">Log in instead</Link>
            </Button>
          </CardDescription>
        </CardFooter>
      </form >
    </Form>
  );
}

interface CodeStepProps {
  email: string;
  onBack: () => void;
}

function CodeStep({ email, onBack }: CodeStepProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const form = useForm<z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      code: "",
    },
  })

  const onSubmit = (data: z.infer<typeof CodeSchema>) => {
    setIsVerifying(true);
    db.auth.signInWithMagicCode({ email: email, code: data.code })
      .then(() => {
        toast.success("Logged in successfully!");
      })
      .catch(() => {
        setIsVerifying(false);
        toast.error("This code is invalid. Please try again.");
      });
  }

  return (
    <Form {...form}>
      <form
        key="code"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <CardHeader>
          <CardTitle>Enter your code</CardTitle>
          <CardDescription>
            We sent an email to <strong>{email}</strong>. Check your email,
            and paste the code you see.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={6}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="size-10 text-xl" />
                      <InputOTPSlot index={1} className="size-10 text-xl" />
                      <InputOTPSlot index={2} className="size-10 text-xl" />
                      <InputOTPSlot index={3} className="size-10 text-xl" />
                      <InputOTPSlot index={4} className="size-10 text-xl" />
                      <InputOTPSlot index={5} className="size-10 text-xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isVerifying}>
            {isVerifying && <Loader className="animate-spin -ml-2" />}
            {isVerifying ? "Verifying..." : "Verify Code"}
          </Button>
          <CardDescription className="inline">
            Didn&apos;t receive a code? Wait a moment or{" "}
            <Button type="button" variant="link" onClick={onBack} size="sm" className="p-0" disabled={isVerifying}>try again.</Button>
          </CardDescription>
        </CardFooter>
      </form>
    </Form>
  );
}

