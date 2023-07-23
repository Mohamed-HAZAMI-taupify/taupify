import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function ReservationSkeleton() {
  return (
    <div className="skeleton-div">
      <Skeleton className="img-skeleton" />
      <Skeleton className="info-skeleton" />
    </div>
  );
}
