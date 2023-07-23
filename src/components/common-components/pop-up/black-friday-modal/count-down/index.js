import React, { useState } from "react";
import SkeletonLoader from "../../../image-loader/SkeletonLoader";
import Clock from "./Clock";

function CountDownContent() {
  const [deadline, setDeadLine] = useState("November, 28, 2021");
  const date = Date.parse(new Date());
  const time = Date.parse(deadline) - date;

  return (
    <>
      {time < 0 ? (
        <SkeletonLoader
          alt="Everest Studio page"
          className="modal-image"
          src="https://i.ibb.co/k55TPKV/photo-5.jpg"
        />
      ) : (
        <div className="section-left-timer">
          <img
            src="https://i.ibb.co/W630946/BLACK-FRIDAY-PNG.png"
            className="image-modal"
          />
          <div className="timer-modal">
            <Clock deadline={deadline} />
          </div>
        </div>
      )}
    </>
  );
}

export default CountDownContent;
