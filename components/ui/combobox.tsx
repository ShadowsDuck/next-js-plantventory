"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const plantCategories = [
  { value: "", label: "Select category..." },
  { value: "Indoor", label: "Indoor" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Succulent", label: "Succulent" },
  { value: "Flowering", label: "Flowering" },
  { value: "Herb", label: "Herb" },
  { value: "Fern", label: "Fern" },
  { value: "Tree", label: "Tree" },
  { value: "Shrub", label: "Shrub" },
];

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  className?: string;
}

export function Combobox({ value, onChange, error, className }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  // หา label ที่ตรงกับ value ปัจจุบัน
  const selectedCategory = plantCategories.find((cat) => cat.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between",
            error && "!border-[#ff5b5b]",
            className && className
          )}
          style={error ? { borderColor: "rgb(255, 91, 91)" } : undefined}
        >
          {selectedCategory ? selectedCategory.label : "Select category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {plantCategories.map((cat) => (
                <CommandItem
                  key={cat.value}
                  value={cat.value}
                  onSelect={() => {
                    onChange(cat.value);
                    setOpen(false);
                  }}
                >
                  {cat.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === cat.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
