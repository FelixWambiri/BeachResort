import React, { Component } from 'react';
import { RoomContext } from '../Context';

export default class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    const {greetings, name} = this.context;
    return (
      <div>
        {greetings} {name} From Featured Rooms
      </div>
    )
  }
}
