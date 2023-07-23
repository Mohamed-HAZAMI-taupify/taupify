import React, { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const ImageLoader = (props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="skeleton-image">
      {loaded ? null : <Skeleton className="img-skeleton" />}
      <img
        alt={props.alt}
        className={props.className}
        src={props.src}
        style={loaded ? {} : { display: "none" }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageLoader;
