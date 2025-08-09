"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Sprout } from "lucide-react";
import { useState } from "react";
import { PlantForm } from "../forms/plant-form";

export function CreatePlantButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-max">
          <Sprout />
          Add Plant
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add a new plant</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new plant to your inventory.
          </DialogDescription>
        </DialogHeader>
        <PlantForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
