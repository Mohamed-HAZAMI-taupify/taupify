import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { Container, Row, Col } from "reactstrap";
import date from "date-and-time";
import { NotFoundPage } from "../common-components/not-found/Page";
import { LOAD_SUBSCRIPTIONS } from "../graphQL/Queries";
import { useQuery } from "@apollo/client";
import WhiteSpinnerLoading from "../common-components/spinner-loanding/WhiteSpinnerLoading";

const MemberSales = (props) => {
  const [subscriptionsList, setSubscriptionsList] = useState([]);
  const [index, setIndex] = React.useState(0);

  const {
    loading: loadingSubscriptions,
    error: errorSubscriptions,
    data: dataSubscriptions,
  } = useQuery(LOAD_SUBSCRIPTIONS);

  useEffect(() => {
    if (dataSubscriptions) {
      setSubscriptionsList(dataSubscriptions.subscriptions);
    }
  }, [dataSubscriptions]);

  const IndexSecond = () => {
    setIndex(1);
  };
  const IndexFirst = () => {
    setIndex(0);
  };
  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  return (
    <div className="member-page">
      <div className="container-fluid">
        <i className="fas fa-shopping-bag mobile icon-member-space"></i>
        <span className="title-member"> Mes achats</span>
      </div>

      <div className="container-fluid">
        <div className="card-box">
          <div className="infos-perso-content">
            <span className="subtitle-member">
              <i className="far fa-credit-card profile-icons-xl"></i> Mes cartes
              bancaires
            </span>
            <hr />
            <br />
          </div>

          <Container>
            <div className="container-cb">
              <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                <div className="draw-cb" onClick={IndexSecond}>
                  <Container>
                    <Row>
                      <Col>Ajouter une carte</Col>
                    </Row>
                    <Row>
                      <Col>
                        <button className="btn-circle">
                          <span className="plus-icon">
                            <i className="fas fa-plus fa-xs  plus-circle"></i>
                          </span>
                        </button>
                      </Col>
                    </Row>
                  </Container>
                </div>

                <div className="form-cb">
                  <Container>
                    <div className="drom-cb-div">
                      <h3 className="drom-cb-div-h3">
                        Service non disponible. Veuillez contacter
                        EVERESTSPORTCLUB
                      </h3>
                    </div>
                    {/* <Row>
                      <h4 className="add-cb"> Ajouter une carte </h4>

                      <h4 className="choose-cb">
                        <a onClick={IndexFirst}>
                          {" "}
                          choisir une carte enregistrée{" "}
                        </a>
                      </h4>
                    </Row>
                    <hr /> */}

                    {/* <Row>
                      <Col>
                        <form className={classes.root} noValidate>
                          <CssTextField
                            className={classes.margin}
                            id="custom-css-standard-input"
                            label="Nom du titulaire"
                            inputProps={{
                              maxLength: 3,
                            }}
                          />
                          <CssTextField
                            className={classes.margin}
                            id="custom-css-standard-input"
                            label="Numéro de la carte"
                          />
                          <FormControl className={classes.marginRight}>
                            <InputLabel htmlFor="uncontrolled-native">
                              Date d'expiration
                            </InputLabel>

                            <NativeSelect
                              defaultValue={1}
                              inputProps={{
                                name: "name",
                                id: "uncontrolled-native",
                              }}
                              input={<BootstrapInput />}
                            >
                              <option aria-label="None" value="" />
                              <option value={0}>0</option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                            </NativeSelect>
                          </FormControl>
                          <FormControl className={classes.marginRight}>
                            <InputLabel htmlFor="uncontrolled-native">
                              {" "}
                            </InputLabel>

                            <NativeSelect
                              defaultValue={2}
                              inputProps={{
                                name: "name",
                                id: "uncontrolled-native",
                              }}
                              input={<BootstrapInput />}
                            >
                              <option value={0}>0000</option>
                              <option value={1}>1000</option>
                              <option value={2}>2000</option>
                            </NativeSelect>
                          </FormControl>
                          &ensp;&ensp;&ensp;&ensp;&ensp;
                          <div className={classes_cvv.root}>
                            <div>
                              <TextField
                                placeholder="XXX"
                                label="Code CVV"
                                id="standard-start-adornment"
                                className={clsx(
                                  classes_cvv.margin,
                                  classes_cvv.textField
                                )}
                              />
                            </div>
                          </div>
                        </form>
                      </Col>
                    </Row>
                
                 */}
                  </Container>
                </div>
              </SwipeableViews>
            </div>
          </Container>
          <div className="infos-perso-content">
            <span className="subtitle-member">
              {" "}
              <i className="far fa-address-card profile-icons-xl"></i>&nbsp; Mes
              abonnements
            </span>
            <hr />
            <br />
          </div>

          <Container>
            <div className="card-subscription-group ">
              {errorSubscriptions ||
              (subscriptionsList.length === 0 && !loadingSubscriptions) ? (
                <NotFoundPage src="https://i.ibb.co/9NntsXR/abonnement.png" />
              ) : null}

              {loadingSubscriptions ? (
                <WhiteSpinnerLoading loading={loadingSubscriptions} />
              ) : null}

              {subscriptionsList &&
                subscriptionsList.map((subscription, i) => (
                  <ul key={i}>
                    <li className="card-subscription-container">
                      <div className="card-subscription">
                        <div className="subscription-title">
                          {subscription.name}
                        </div>
                        <div className="subscription-details">
                          <div className="subscription-detail">
                            <h1> Facturation :</h1>{" "}
                            <span> {subscription.initialInfo.offerName} </span>
                          </div>
                          <div className="subscription-detail">
                            <h1>Date de début :</h1>{" "}
                            <span>
                              {" "}
                              {date.format(
                                new Date(subscription.validFrom),
                                "DD/MM/YYYY"
                              )}
                            </span>
                          </div>
                          <div className="subscription-detail">
                            <h1>Date de fin : </h1>{" "}
                            <span>
                              {date.format(
                                new Date(subscription.inclusiveValidThrough),
                                "DD/MM/YYYY"
                              )}
                            </span>
                          </div>
                          <div className="subscription-detail">
                            <h1>Prix hors taxe :</h1>{" "}
                            <span>
                              {subscription.articleObject != null
                                ? Number(subscription.articleObject.priceTE) /
                                  100
                                : "--"}
                              €
                            </span>
                          </div>
                          <div className="subscription-detail">
                            <h1>Taux de taxe :</h1>{" "}
                            <span>
                              {subscription.articleObject != null
                                ? Number(subscription.articleObject.taxRate) /
                                  100
                                : "--"}
                              %
                            </span>
                          </div>
                        </div>

                        <div className="card-subscription-price">
                          {subscription.articleObject != null
                            ? Number(subscription.articleObject.priceTI) / 100
                            : "--"}
                          €
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    subscriptionReducer: state.SubscriptionReducer,
    alertReducer: state.AlertReducer,
    articleReducer: state.ArticleReducer,
  };
};

export default connect(mapStateToProps, null)(MemberSales);
