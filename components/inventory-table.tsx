"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combobox";
import { useState } from "react";
import { Plant } from "@/db/schema";
import { useRouter } from "next/navigation";
import { CreatePlantButton } from "./create-plant-button";

interface InventoryTableProps {
  plants: Plant[];
}

export default function InventoryTable({ plants }: InventoryTableProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlants = plants.filter((plant: Plant) => {
    const matchesName = searchTerm
      ? plant.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? plant.category === selectedCategory
      : true;

    return matchesName && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Filter plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <Combobox
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
        />
        <div className="flex justify-end">
          <CreatePlantButton />
        </div>
      </div>
      <Table>
        <TableCaption>A list of your recent plants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlants?.length ? (
            filteredPlants?.map((plant) => (
              <TableRow
                key={plant.id}
                className="cursor-pointer"
                onClick={() => router.push(`/plants/${plant.id}`)}
              >
                <TableCell className="w-96">{plant.id}</TableCell>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell>{plant.price}</TableCell>
                <TableCell className="font-bold">{plant.stock}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end space-x-4">
                    <h1>Edit</h1>
                    <h1>Delete</h1>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center p-4">
                <p className="text-gray-500 font-semibold">Not Found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
