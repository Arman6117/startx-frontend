
import './App.css';
import { Outlet } from 'react-router-dom';
import ChatAssistant from './components/ChatAssistant'; // Import the chat assistant
import AppContext from './utils/Context';

function App() {

  return (
    <AppContext>
      
      <Outlet />
      <ChatAssistant /> {/* Add the chat assistant component here */}
    </AppContext>
  );
}

export default App;
