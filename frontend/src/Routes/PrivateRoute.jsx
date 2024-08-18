import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem('token');

  if(!token){
    return <Navigate to="/" />
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:8000/verifyToken", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        console.log('ola');
        response.ok ? setIsAuthenticated(true) : setIsAuthenticated(false);

      } catch (err){
        setIsAuthenticated(false)
      }
    }

    verifyToken();
  }, [token])

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
