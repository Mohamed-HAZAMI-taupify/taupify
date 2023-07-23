import React, { Component } from "react";

class ClockMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
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
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
      <ul className="Clock-container-mobile">
        <li className=" clock-days-li">
          <div className="container-days-mobile">
            {this.leading0(this.state.days)}
          </div>
          <h3 className="days-text-mobile"> Jours </h3>
        </li>

        <li className=" clock-days-li">
          <div className="container-days-mobile">
            {" "}
            {this.leading0(this.state.hours)}{" "}
          </div>
          <h3 className="days-text-mobile"> Heures </h3>
        </li>

        <li className=" clock-days-li">
          <div className="container-days-mobile">
            {" "}
            {this.leading0(this.state.minutes)}{" "}
          </div>
          <h3 className="days-text-mobile"> Min </h3>
        </li>

        <li className=" clock-days-li">
          <div className="container-days-mobile">
            {" "}
            {this.leading0(this.state.seconds)}{" "}
          </div>
          <h3 className="days-text-mobile"> Sec </h3>
        </li>
      </ul>
    );
  }
}
export default ClockMobile;
