import { getPlantById } from "@/server/plant";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import BackButton from "./buttons/back-button";

type Plant = Awaited<ReturnType<typeof getPlantById>>;

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <>
      <BackButton />
      <Card>
        <CardContent>
          <div className="flex flex-row">
            <div className="w-[400px] h-[350px] relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={
                  plant.plant?.imageUrl ||
                  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                }
                alt={plant.plant?.name || "Plant Image"}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col px-10 py-2 gap-4">
              <h1 className="text-5xl font-bold">{plant.plant?.name}</h1>
              <h2 className="text-2xl font-bold">฿{plant.plant?.price}</h2>
              <Badge className="rounded-lg">{plant.plant?.category}</Badge>
              <p className="text-muted-foreground text-sm">
                stock: {plant.plant?.stock}
              </p>
              <p>{plant.plant?.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
