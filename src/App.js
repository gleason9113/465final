import React from 'react';
import Container from './components/Container';

function App() {
  
  return (
    <Container />
  );
}

export default App;


/*
const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect(window.location.origin);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
*/