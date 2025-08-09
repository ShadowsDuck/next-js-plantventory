"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Loader2, OctagonAlert, Trash2 } from "lucide-react";
import { useState } from "react";
import { Plant } from "@/db/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deletePlant } from "@/server/plant";

export function DeletePlantButton({ plantId }: { plantId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      const res = await deletePlant(plantId);

      if (res.success) {
        toast.success(res.message);
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-max">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          if (isLoading) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isLoading) e.preventDefault();
        }}
      >
        <DialogHeader className="items-center">
          <DialogTitle>
            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-7 w-7 text-destructive" />
            </div>
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-[15px] text-center">
            This action cannot be undone. This will permanently delete your
            plant and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2 sm:justify-center">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
