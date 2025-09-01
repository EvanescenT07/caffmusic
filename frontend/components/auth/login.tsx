"use client";

import type React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AtSign, Lock } from "lucide-react";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });
      if (response?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful");
        router.push("/");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <Card className="w-full max-w-md bg-white/70 dark:bg-background/70 backdrop-blur-md shadow-lg border border-black/10 dark:border-white/10 rounded-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center dark:text-[#ccc] text-[#383838]">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center dark:text-[#ccc] text-[#383838]">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 mb-6">
            <Button
              variant="outline"
              className="flex items-center gap-2 justify-center rounded-full transition-all hover:bg-[#383838] dark:hover:bg-[#ccc] hover:text-[#ccc] dark:hover:text-[#383838]"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <FcGoogle className="w-5 h-5" /> Login with Google
            </Button>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-background px-2 text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10 rounded-full bg-secondary/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 rounded-full bg-secondary/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="rounded-full mt-2 transition-all hover:bg-[#383838] dark:hover:bg-[#ccc] hover:text-[#ccc] dark:hover:text-[#383838]"
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm dark:text-[#ccc] text-[#383838]">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Create account
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
