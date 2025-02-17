import React, { useState } from "react";

const Login = ({onLogin}) => {
    const [email, setEmail] = useState("");
    cont [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (    
    <form onSubmit={handleSubmit}>     
     <h2>Iniciar Sesión</h2>   
     <input       
        type="email"    
        placeholder="Email"    
        onChange={(e) => setEmail(e.target.value)}    
        required     
         />     
     <input       
        type="password"    
        placeholder="Password"     
        value={password}     
        onChange={(e) => setPassword(e.target.value)}     
        required    
           />     
         <button type="submit">Iniciar Sesión</button>  
          </form>
          );
     };
                
    export default Login;

