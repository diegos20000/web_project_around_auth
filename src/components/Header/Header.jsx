import React from "react";
import Logo from "../../images/Vector.jpg";
import { useNavigate, useLocation } from "react-router-dom";


const Header = ({onSignOut}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => { 
    const currentPath = location.pathname;
      if (currentPath === "/signin") {    
          navigate("/signup"); 
       } else {       
          navigate("/signin"); 
        }  
     };

  return (
    <div>  
      <header className="header">     
     <div className="header__title">   
     <img src={Logo} alt="Around The U.S." />      
       </div>   
     <div className="header__button-container">  
     <button className="header__button" onClick={handleToggle}>       
           {location.pathname === "/signin" ? "Regístrate" : "Inicia Sesión"}  
                   </button>      
                     </div>  
                         </header>    
                           <hr className="header__hr" />
                              </div> 
                               );
                              };
                              
                              export default Header;
