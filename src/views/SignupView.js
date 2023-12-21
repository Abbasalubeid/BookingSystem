import React, { useState } from "react";
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

const SignupView = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSignup(email, password);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[650px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create a new account</CardTitle>
          <CardDescription>
            Enter your email and password to signup
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
              Sign up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupView;
