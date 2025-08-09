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

import { Sprout, SquarePen } from "lucide-react";
import { useState } from "react";
import { PlantForm } from "../forms/plant-form";
import { Plant } from "@/db/schema";

export function UpdatePlantButton({ plant }: { plant: Plant }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-max">
          <SquarePen />
          Edit Plant
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Update a plant</DialogTitle>
          <DialogDescription>
            Fill out the form to update a plant in your inventory.
          </DialogDescription>
        </DialogHeader>
        <PlantForm plant={plant} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
