import axios from "axios";
import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import ImageLoader from "../../common-components/image-loader";
import { _create_payment_intent } from "../../../data/config";
import { payment } from "../../../redux/actions/PaymentAction";
import { connect } from "react-redux";

const BuyTshirtEverest = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="buy-t-shirt-container">
      <div className="row-t-shirt">
        <Row>
          <Col sm={"6"}>
            <div className="image-t-shirt-container ">
              <ImageLoader
                alt="t-shirt everest"
                src="https://i.ibb.co/WfGhYzF/t-shirt-prop3.png"
                className="img-t-shirt"
              />
            </div>
          </Col>
          <Col sm={"6"}>
            <h1 className="t-shirt-title weight-semi-bold">PULL EVEREST</h1>
            <p className="t-shirt-description">
              Il vous suffit d’acheter un pull Everest et vous serez
              automatiquement inscrit dans le tirage qui aura lieu le 18 juin !
            </p>

            <div className="payment-container">
              <div className="price-t-shirt">
                <h3 className="weight-medium">PRIX</h3>
                <h3 className="weight-medium">20 €</h3>
              </div>

              <button
                className="buy-t-shirt-button"
                onClick={() => props.payment()}
              >
                <span className="buy-t-shirt-button-span uppercase">
                  achetez
                </span>
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  payment: () => {
    dispatch(payment());
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BuyTshirtEverest);
