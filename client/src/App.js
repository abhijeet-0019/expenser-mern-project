import Appbar from './components/Appbar';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from './store/auth';
import React from 'react';
import Cookies from 'js-cookie';
import { isUnitless } from '@mui/material/styles/cssUtils';

function App() {
  // const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const token = Cookies.get('token');
  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const user = await res.json();
      // console.log("user --> ", user);
      dispatch(getUser(user));
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchUser();
  }, [])

  if(isLoading){
    return <h1>Loading ....</h1>
  }

  // console.log("auth --> ", auth);
  return (
    <div>
      <Appbar />
      <Outlet />
    </div>
  );
}

export default App;