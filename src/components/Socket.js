import io from 'socket.io-client';

const port = "http://localhost:8080"; //need to change it before deployment
const Socket = io.connect(port);
export default Socket;