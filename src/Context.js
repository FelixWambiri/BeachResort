import React, { Component } from 'react';
import items from './data';
// this is equivalent to the createStore method of redux
const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  // get data from external source

  componentDidMount(){
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    let maxPrice = Math.max(...rooms.map(item => item.price))
    let maxSize = Math.max(...rooms.map(item => item.size))
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    let room = tempRooms.find(room => room.slug === slug);
    return room;
  }

  formatData(items){
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image =>
        image.fields.file.url
      );
      let room = {...item.fields, images, id};
      return room;
    });
    return tempItems;
  }

  // this method handles all events
  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked :target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    }, this.filterRooms)
  }

  filterRooms = () => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;

    // all the rooms
    let tempRooms = [...rooms];

    // transform value
    capacity = parseInt(capacity);

    // filter by type
    if(type !== 'all'){
      tempRooms = tempRooms.filter(room => room.type === type)
    }

    // filter by capacity
    if(capacity !== 1 ){
      tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }

    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // filter by size
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

    // filter by breakfast
    if(breakfast){
      tempRooms = tempRooms.filter(room => room.breakfast === true)
    }

    // filter by pets
    console.log('>>>>>>>>>>>>>>the pets are', pets)
    if(pets){
      tempRooms = tempRooms.filter(room => room.pets === true)
    }

    // change state
    this.setState({
      sortedRooms: tempRooms,
    })
  }

  render() {
    return (
      <RoomContext.Provider value={{...this.state, getRoom:this.getRoom, handleChange: this.handleChange }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  };
};


const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
  return function ConsumerWrapper(props){
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value}/>}
      </RoomConsumer>
    )
  }
}

export {RoomProvider, RoomConsumer, RoomContext};
