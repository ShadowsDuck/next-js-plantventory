"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      await authClient.signOut();
      router.push("/");
      router.refresh();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
      <LogIn strokeWidth={2.25} size={18} />
      <span>Sign Out</span>
    </DropdownMenuItem>
  );
}
