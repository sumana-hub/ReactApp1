import React, { Component } from 'react';

export class ReservationCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { newArea: "", newTime: "" };
  }

  updateAreaValue = (event) => this.setState({ newArea: event.target.value });
  updateTimeValue = (event) => this.setState({ newTime: event.target.value });

  createReservation = () => {
    this.props.callback(this.state.newArea, this.state.newTime);
    this.setState({ newArea: "", newTime: "" });
  };

  render = () =>
    <div className="my-1">
      <input className="form-control" placeholder="Area"
        value={this.state.newArea} onChange={this.updateAreaValue} />
      <input className="form-control mt-1" placeholder="Time Slot"
        value={this.state.newTime} onChange={this.updateTimeValue} />
      <button className="btn btn-primary mt-1"
        onClick={this.createReservation}>Add Reservation</button>
    </div>
}
