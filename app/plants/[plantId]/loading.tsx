import BackButton from "@/components/buttons/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlantCardSkeleton() {
  return (
    <div className="page-wrapper">
      <BackButton />
      <Card>
        <CardContent>
          <div className="flex flex-row">
            <Skeleton className="w-[400px] h-[350px] rounded-lg" />
            <div className="flex flex-col px-10 py-2 gap-4">
              {/* Plant name skeleton */}
              <Skeleton className="h-12 w-[300px]" />

              {/* Price skeleton */}
              <Skeleton className="h-8 w-[120px]" />

              {/* Badge/Category skeleton */}
              <Skeleton className="h-6 w-[100px] rounded-lg" />

              {/* Stock skeleton */}
              <Skeleton className="h-5 w-[80px]" />

              {/* Description skeleton - multiple lines */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-[400px]" />
                <Skeleton className="h-4 w-full max-w-[350px]" />
                <Skeleton className="h-4 w-full max-w-[250px]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
