"use server";

import { db } from "@/db/drizzle";
import { InsertPlant, plants } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { getUserId } from "./user";

export const getPlants = async (searchTerm?: string) => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { success: false, message: "User not found", userPlants: [] };
    }

    if (searchTerm) {
      const filteredPlants = await db.query.plants.findMany({
        where: and(
          sql`${plants.name} ILIKE ${"%" + searchTerm + "%"}`,
          eq(plants.userId, userId)
        ),
      });

      return { success: true, userPlants: filteredPlants };
    }

    const userPlants = await db.query.plants.findMany({
      where: eq(plants.userId, userId),
    });

    return { success: true, userPlants };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to get plants",
      userPlants: [],
    };
  }
};

export const getPlantById = async (id: string) => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { success: false, message: "User not found" };
    }

    const plant = await db.query.plants.findFirst({
      where: and(eq(plants.id, id), eq(plants.userId, userId)),
      with: {
        user: true,
      },
    });

    if (!plant) {
      return { success: false, message: "Plant not found" };
    }

    return { success: true, plant };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to get plant",
    };
  }
};

export const createPlant = async (values: InsertPlant) => {
  try {
    await db.insert(plants).values(values);
    return { success: true, message: "Plant created successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to create plant",
    };
  }
};

// export const updateNotebook = async (id: string, values: InsertNotebook) => {
//   try {
//     await db.update(notebooks).set(values).where(eq(notebooks.id, id));
//     return { success: true, message: "Notebook updated successfully" };
//   } catch (error) {
//     const e = error as Error;
//     return {
//       success: false,
//       message: e.message || "Failed to update notebook",
//     };
//   }
// };

// export const deleteNotebook = async (id: string) => {
//   try {
//     await db.delete(notebooks).where(eq(notebooks.id, id));
//     return { success: true, message: "Notebook deleted successfully" };
//   } catch (error) {
//     const e = error as Error;
//     return {
//       success: false,
//       message: e.message || "Failed to delete notebook",
//     };
//   }
// };
