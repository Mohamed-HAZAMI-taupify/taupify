import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { couponData } from "../../../data/CouponData";
const CouponCard = (props) => {
  return (
    <Card className="coupon-card">
      <Card.Header className="coupon-header">
        <img src="https://i.ibb.co/jMMBtzw/logoeverest-noir.png" />
      </Card.Header>
      <Card.Body className="coupon-body">
        <div className="coupon-background">
          <img src="https://i.ibb.co/JFp8FSx/montagne-croped.png" />
        </div>
        <div className="coupon-content">
          <div className="content-discount">
            {couponData.map((discount) => (
              <div className="price-offer-container" key={discount.id}>
                <span className="price">{discount.price}</span>
                <span className="offer">{discount.offer}</span>
              </div>
            ))}
          </div>
          <div className="content-footer">www.everest-sportclub.fr</div>
        </div>
      </Card.Body>
    </Card>
  );
};

const ConnectedCouponCard = connect(null, null)(CouponCard);
export default ConnectedCouponCard;
