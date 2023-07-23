import React, { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";

const ImageLoader = (props) => {
  const [loaded, setLoaded] = useState(false);

  const override = css`
    top: 50%;
    position: absolute;
    left: 50%;
  `;
  return (
    <>
      {false ? null : (
        <MoonLoader
          className="image-loader"
          color="#ffff"
          loading={!loaded}
          size={50}
          css={override}
        />
      )}
      <picture>
      <img
        rel="preload"
        alt={props.alt}
        className={props.className}
        src={props.src}
        style={loaded ? {} : { display: "none" }}
        onLoad={() => setLoaded(true)}
      />
      </picture>
    </>
  );
};

export default ImageLoader;