import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginView = ({ onLogin, isLoginSuccess, isAdmin, isLoading, loginError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isLoginSuccess) {
      const redirectUrl = isAdmin ? "/admin" : "/courses";
      window.location.reload();
      router.push(redirectUrl);
    }
  }, [isLoginSuccess, isAdmin, router]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[650px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in</CardTitle>
          <CardDescription>
            Enter your username and password to login
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleFormSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="john_doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
          {!isLoginSuccess &&  (
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
              </Button>
            )}
            {isLoginSuccess && <p className="text-green-500">Login successful!</p>}
            {loginError && <p className="text-red-500">{loginError}</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginView;
