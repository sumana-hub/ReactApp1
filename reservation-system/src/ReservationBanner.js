import React, { Component } from 'react';

export class ReservationBanner extends Component {
  render = () =>
    <h4 className="bg-primary text-white text-center p-2">
      Reservation System
      ({this.props.reservations.filter(r => !r.reserved).length} slots available)
    </h4>
}
