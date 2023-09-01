import Appbar from './components/Appbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Appbar />
      <Outlet />
    </div>
  );
}

export default App;