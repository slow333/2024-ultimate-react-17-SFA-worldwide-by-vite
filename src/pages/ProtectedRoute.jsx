import React, {useEffect} from 'react';
import {useAuth} from "../contexts/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
   const {isAuthenticated} = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated) {
         return navigate('/')
      }
   }, [isAuthenticated, navigate]);
  return isAuthenticated ? children: null
}

export default ProtectedRoute;