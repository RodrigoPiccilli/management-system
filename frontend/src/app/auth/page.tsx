"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/lib/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage("Login failed: " + error.message);
    } else {
      setMessage("Login successful! Welcome.");
      // You can redirect here if you want, e.g. using next/navigation
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200 ">
      <form
        className="flex flex-col border-8 border-gray-300 p-8 bg-white w-1/3 h-1/2 rounded-3xl"
        onSubmit={handleLogin}
      >
        <h1 className="text-5xl mt-5 mb-5 text-center">Employee Login</h1>
        <div className="flex flex-col gap-2.5 p-5">
          <Label className="text-lg" htmlFor="email">
            Email
          </Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Label className="text-lg" htmlFor="pin">
            PIN
          </Label>
          <Input
            type="password"
            placeholder="PIN"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button className="mt-5.5 text-lg p-7 w-1/2 self-center" type="submit">
            Log In
          </Button>
          {message && (
            <div className="mt-4 text-center text-red-600">{message}</div>
          )}
        </div>
      </form>
    </div>
  );
}