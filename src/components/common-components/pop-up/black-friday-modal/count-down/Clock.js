import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      show: false,
    };
  }
  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }
  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }
  leading0(num) {
    return num < 10 ? "0" + num : num;
  }
  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      this.setState({
        days: 0,
        hours: 10,
        minutes: 10,
        seconds: 60,
        show: true,
      });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({ days, hours, minutes, seconds });
    }
  }
  render() {
    return (
      <div className="Clock-container">
        {this.state.show ? null : (
          <Row>
            <Col sm={3} className="col-row-timer">
              <div className="Clock-days">
                <div className="container-days">
                  {this.leading0(this.state.days)}
                </div>
                <h3 className="days-text jours-text"> Jours </h3>
              </div>
            </Col>

            <Col sm={3} className="col-row-timer-two">
              <div className="Clock-hours">
                <div className="container-days">
                  {" "}
                  {this.leading0(this.state.hours)}{" "}
                </div>
                <h3 className="days-text hour-text"> Heures </h3>
              </div>
            </Col>

            <Col sm={3} className="col-row-timer-two">
              <div className="Clock-minutes">
                <div className="container-days">
                  {" "}
                  {this.leading0(this.state.minutes)}{" "}
                </div>
                <h3 className="days-text minute-text"> Minutes </h3>
              </div>
            </Col>

            <Col sm={3}>
              <div className="Clock-seconds">
                <div className="container-days">
                  {" "}
                  {this.leading0(this.state.seconds)}{" "}
                </div>
                <h3 className="days-text seconds-text"> Secondes </h3>
              </div>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
export default Clock;
