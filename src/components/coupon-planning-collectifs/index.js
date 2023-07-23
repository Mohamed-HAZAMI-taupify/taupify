import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import coupon_file from "../../assets/files/planning_everest_à_partir_du_19_septembre.pdf";

const CouponCoursCollectifs = () => {
  return (
    <Card className="coupon-container">
      <div className="coupon-cheque cheque-cours-collectifs">
        <h1 className="cheque-title">Votre planning de cours collectifs</h1>
        <div className="cheque-message">
          <p>
            Téléchargez votre nouveau planning dès maintenant en cliquant sur le
            bouton ci-dessous
          </p>
        </div>
        <div className="cheque-btn">
          <button className=" btn-ev btn-m uppercase">
            <a
              href={coupon_file}
              className="download-planning-a"
              download="planning_everest_à_partir_du_19_septembre.pdf"
            >
              Télécharger votre planning
            </a>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default connect(null, null)(CouponCoursCollectifs);
