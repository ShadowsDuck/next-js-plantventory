import NotFoundPage from "@/components/not-found-page";
import PlantCard from "@/components/plant-card";
import { cn } from "@/lib/utils";
import { getPlantById } from "@/server/plant";

type Params = Promise<{
  plantId: string;
}>;

export default async function page({ params }: { params: Params }) {
  const { plantId } = await params;

  const plant = await getPlantById(plantId);

  return (
    <div className={cn(plant.success && "page-wrapper")}>
      {plant.success ? <PlantCard plant={plant} /> : <NotFoundPage />}
    </div>
  );
}
