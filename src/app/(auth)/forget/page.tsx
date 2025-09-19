"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success(
          data.message ||
            "Check your email for a reset link",
          { position: "top-center" }
        );
      } else {
        toast.error(data.message || "Failed to send reset email", {
          position: "top-center",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", { position: "top-center" });
      console.log(error);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </section>
  );
}
