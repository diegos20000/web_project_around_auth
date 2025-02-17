import react from "react";

const InfoTooltip = ({isOpen, message, onClose}) => {
    return (   
         isOpen && (      
         <div className="modal">      
           <div className="modal-content">        
              <p>{message}</p>       
                 <button onClick={onClose}>Cerrar</button>       
                  </div>   
                     </div>  
                       )  
                    );
                };
    export default InfoTooltip