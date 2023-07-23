import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import ConnectedCouponCard from "./coupon-card";
import coupon_file from "../../assets/files/cheque_cadeau_octobre_rose.pdf";
import ReactPixel from "react-facebook-pixel";

const Coupon = (props) => {
  const options = {
    autoConfig: true,
    debug: false,
  };

  useEffect(() => {
    ReactPixel.init("3033952286871743", options);
    ReactPixel.pageView();
  }, []);

  return (
    <Card className="coupon-container">
      <div className="coupon-cheque">
        <h1 className="cheque-title">Chèque cadeau</h1>
        <div className="cheque-message">
          <p>
            {" "}
            Pour vous remercier pour votre participation au trail des Boucles
            Roses, nous vous offrons une séance d'essai pour découvrir l'univers
            Everest !{" "}
          </p>
          <p> Pour en profiter, veuillez télécharger le coupon ci-dessous: </p>
        </div>
        <div className="cheque-btn">
          <button className=" btn-ev btn-m uppercase">
            <a
              href={coupon_file}
              className="download-planning-a"
              download="cheque_cadeau_octobre_rose.pdf"
            >
              Télécharger le coupon
            </a>
          </button>
        </div>
      </div>
      <ConnectedCouponCard />
    </Card>
  );
};

export default Coupon;