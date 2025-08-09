import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton() {
  return (
    <Button size="lg" variant="outline" className="w-24 mb-6" asChild>
      <Link href="/plants">
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>
    </Button>
  );
}
