import {io} from "socket.io-client"; // Add this

let socket;

const connectSocket = (userId) => {
  socket = io(process.env.REACT_APP_BACKEND_BASEURL, {
    query: `userId=${userId}`,
  });
} 

export {socket, connectSocket};
