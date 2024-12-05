import React, { Component } from 'react';

export class SlotRow extends Component {
  render = () =>
    <tr>
      <td>{this.props.item.area}</td>
      <td>{this.props.item.time}</td>
      <td>
        <input type="checkbox" checked={this.props.item.reserved}
          onChange={() => this.props.callback(this.props.item)} />
      </td>
    </tr>
}
