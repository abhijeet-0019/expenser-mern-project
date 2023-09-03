import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function CheckAuth({ children }) {
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    async function validateToken() {
      const token = Cookies.get('token');

      if (token) {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            setIsValidToken(true);
          } else {
            setIsValidToken(false);
            // Use navigate to redirect to the login page
            navigate('/login');
          }
        } catch (error) {
          setIsValidToken(false);
          // Use navigate to redirect to the login page
          navigate('/login');
        }
      } else {
        setIsValidToken(false);
        // Use navigate to redirect to the login page
        navigate('/login');
      }
    }

    validateToken();
  }, [navigate]);

  if (!isValidToken) {
    // You can also use navigate to redirect here if needed
    // navigate('/login');
    return null; // or any other content you want to show before redirection
  }
  
  return children;
}
