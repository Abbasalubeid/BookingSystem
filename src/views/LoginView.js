import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubLogoIcon, DiscordLogoIcon} from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <div>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleFormSubmit}>
          <CardContent className="grid gap-4">
            <Button variant="outline">
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <DiscordLogoIcon className="mr-2 h-4 w-4" />
              Discord
            </Button>
            <div className="grid gap-2" >
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
            <Button type="submit" className="w-full">Log in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginView;
