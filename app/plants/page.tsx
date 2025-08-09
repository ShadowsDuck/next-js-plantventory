import InventoryTable from "@/components/inventory-table";
import { getPlants } from "@/server/plant";

export default async function page() {
  const plants = await getPlants();

  return (
    <div className="page-wrapper">
      <InventoryTable plants={plants.userPlants} />
    </div>
  );
}
