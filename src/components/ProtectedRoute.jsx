import React, { Component } from "react";
import {Route, Navigate} from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {  
    return (    
    <Route     
     {...rest}     
      render={(props) =>       
         isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />   
         }   
     />
    );
 };

export default ProtectedRoute;