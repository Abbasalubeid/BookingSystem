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
import { useRouter } from 'next/navigation'

const LoginView = ({ onLogin, isLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isLoginSuccess) {
      router.push('/courses');
    }
  }, [isLoginSuccess, router]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[650px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleFormSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                // type="email"
                placeholder="johnDoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <Button type="submit" className="w-full">
              Log in
            </Button> 
            {isLoginSuccess && <p className="text-green-500">Login successful!</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginView;
