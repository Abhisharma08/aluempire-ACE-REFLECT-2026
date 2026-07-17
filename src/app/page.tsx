"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(event.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
    // On success, the server action performs a redirect, so no need to stop loading state
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <div className="bg-indigo-600 p-3 rounded-xl">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">FollowUp</h1>
            <p className="text-sm text-gray-500">Contact Dashboard</p>
          </div>
        </div>

        <Card className="shadow-lg border-0 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to sign in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100 text-center">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  placeholder="admin@example.com"
                  type="email"
                  required
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="bg-gray-50/50 border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-900" htmlFor="password">
                    Password
                  </label>
                  <Link href="#" className="text-sm text-indigo-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-gray-50/50 border-gray-200"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <Button disabled={isLoading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-6 text-base">
                {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
                Sign in
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center text-sm text-gray-500">
          Internal access only. Secured by simple auth.
        </p>
      </div>
    </div>
  );
}
