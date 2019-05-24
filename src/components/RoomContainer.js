// Using  a high order component
import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import { withRoomConsumer } from '../Context';
import Loading from './Loading';

function RoomContainer({context}){
  const {loading, sortedRooms, rooms} = context;
  console.log('the sorted rooms are', sortedRooms)
  if(loading)return <Loading/>
    return (
      <>
        Hello From Rooms Container
        <RoomFilter rooms={rooms}/>
        <RoomList rooms={sortedRooms}/>
      </>
    );
}


export default withRoomConsumer(RoomContainer);

// import React from 'react';
// import RoomFilter from './RoomFilter';
// import RoomList from './RoomList';
// import { RoomConsumer } from '../Context';
// import Loading from './Loading';

// export default function RoomContainer() {
//   return (
//     <RoomConsumer>
//       {
//         (value) => {
//           const {loading, sortedRomms, rooms} = value;
//           if(loading)return <Loading/>
//           return (
//             <div>
//               Hello From Rooms Container
//               <RoomFilter rooms={rooms}/>
//               <RoomList rooms={sortedRomms}/>
//             </div>
//           );
//         }
//       }
//     </RoomConsumer>
//   );
// }
