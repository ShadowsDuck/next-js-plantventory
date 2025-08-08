"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main 404 Card */}
        <Card className="shadow-xl border-0 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <CardTitle className="text-6xl font-bold text-slate-900 dark:text-white mb-2">
              404
            </CardTitle>
            <CardDescription className="text-xl text-slate-600 dark:text-slate-300">
              Oops! Page not found
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist. It might have been
              moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
              <Button
                onClick={() => router.push("/")}
                className="w-full sm:w-auto text-white"
                size="lg"
                variant="secondary"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
