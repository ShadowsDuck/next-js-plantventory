"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sprout } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Combobox } from "./ui/combobox";
import { Textarea } from "./ui/textarea";
import { createPlant } from "@/server/plant";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().optional(),
  stock: z.number().min(1, "Stock is required"),
  price: z.number().min(1, "Price is required"),
  image: z.instanceof(File).optional(),
});

export function CreatePlantButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      description: "",
      stock: 0,
      price: 0,
      image: new File([], ""),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      setIsLoading(true);

      const userId = (await authClient.getSession()).data?.user?.id;

      if (!userId) {
        toast.error("You must be logged in to create a plant");
        return;
      }

      // แปลง File เป็น base64 string หรือ URL (ตัวอย่างนี้ใช้ชื่อไฟล์)
      const imageData =
        values.image && values.image.size > 0 ? values.image.name : undefined;

      const res = await createPlant({
        ...values,
        image: imageData, // แปลง File เป็น string
        userId,
      });

      if (res.success) {
        form.reset();
        toast.success(res.message);
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-max" onClick={() => setIsOpen(true)}>
          <Sprout />
          Add Plant
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onCloseAutoFocus={() => form.reset()}
      >
        <DialogHeader>
          <DialogTitle>Add a new plant</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new plant to your inventory.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Combobox
                          value={field.value || ""}
                          onChange={field.onChange}
                          error={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Enter stock"
                          {...form.register("stock", { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Enter price"
                          {...form.register("price", { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                        type="file"
                        onChange={(e) =>
                          field.onChange(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="min-w-19"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading} className="min-w-19">
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
