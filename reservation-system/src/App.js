import React, { Component } from 'react';
import { ReservationBanner } from "./ReservationBanner";
import { ReservationCreator } from "./ReservationCreator";
import { SlotRow } from "./SlotRow";
import { VisibilityControl } from "./VisibilityControl";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Guest",
      reservationItems: [
        { area: "Forest Park", time: "9:00 AM - 12:00 PM", reserved: false },
        { area: "Mountain View", time: "12:00 PM - 3:00 PM", reserved: true },
        { area: "Lake Side", time: "3:00 PM - 6:00 PM", reserved: false },
        { area: "Green Valley", time: "9:00 AM - 12:00 PM", reserved: false }
      ],
      showReserved: true
    };
  }

  createNewReservation = (area, time) => {
    if (!this.state.reservationItems.find(
      item => item.area === area && item.time === time)) {
      this.setState({
        reservationItems: [...this.state.reservationItems,
        { area, time, reserved: false }]
      }, () => localStorage.setItem("reservations", JSON.stringify(this.state)));
    }
  };

  toggleReservation = (reservation) => this.setState({
    reservationItems: this.state.reservationItems.map(item =>
      item === reservation ? { ...item, reserved: !item.reserved } : item)
  });

  reservationTableRows = (reservedValue) => this.state.reservationItems
    .filter(item => item.reserved === reservedValue)
    .map((item, index) =>
      <SlotRow key={index} item={item} callback={this.toggleReservation} />
    );

  componentDidMount = () => {
    let data = localStorage.getItem("reservations");
    this.setState(data != null
      ? JSON.parse(data)
      : {
        userName: "Guest",
        reservationItems: [
          { area: "Forest Park", time: "9:00 AM - 12:00 PM", reserved: false },
          { area: "Mountain View", time: "12:00 PM - 3:00 PM", reserved: true },
          { area: "Lake Side", time: "3:00 PM - 6:00 PM", reserved: false },
          { area: "Green Valley", time: "9:00 AM - 12:00 PM", reserved: false }
        ],
        showReserved: true
      });
  };

  render = () =>
    <div>
      <ReservationBanner name={this.state.userName}
        reservations={this.state.reservationItems} />
      <div className="container-fluid">
        <ReservationCreator callback={this.createNewReservation} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Area</th><th>Time</th><th>Reserved</th></tr>
          </thead>
          <tbody>{this.reservationTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Reserved Slots"
            isChecked={this.state.showReserved}
            callback={(checked) => this.setState({ showReserved: checked })} />
        </div>
        {this.state.showReserved &&
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Area</th><th>Time</th><th>Reserved</th></tr>
            </thead>
            <tbody>{this.reservationTableRows(true)}</tbody>
          </table>
        }
      </div>
    </div>
}
