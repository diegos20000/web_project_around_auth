import React, { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main.jsx";
import Card from "./Card/Card.jsx";
import ConfirmDeletePopup from "./ConfirmDeletePopup.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import EditProfile from "./EditProfile/EditProfile.jsx";
import EditAvatar from "./Avatar/EditAvatar.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Footer from "./Footer/Footer.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import "../../index.css";

import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import { signup, signin } from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  //const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Diego Rodrigo Cano",
    about: "Web Developer Junior",
    avatar:
      "https://media.licdn.com/dms/image/v2/C4E03AQEgdIWRh2TM9Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1613487742717?e=1738800000&v=beta&t=iZfGysB4ySqFIfoveiW0m22UBCVVHzL6MLLIRXLGZMM",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);  
  const [tooltipMessage, setTooltipMessage] = useState('');

  const [cards, setCards] = useState([
    {
      isLiked: false,
      _id: "5d1f0611d321eb4bdcd707dd",
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
      owner: "5d1f0611d321eb4bdcd707dd",
      createdAt: "2019-07-05T08:10:57.741Z",
      likes: [],
    },
    {
      isLiked: false,
      _id: "5d1f064ed321eb4bdcd707de",
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
      owner: "5d1f0611d321eb4bdcd707dd",
      createdAt: "2019-07-05T08:11:58.324Z",
      likes: [],
    },
  ]);

  console.log(cards);

  useEffect(() => {
    const handleEscKey = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleDeletePopupClick(card) {
    setCardToDelete(card);
    setIsDeletePopupOpen(true);
  }

  function handleCardLike(card) {
    const likes = card.likes || [];
    const isLiked = likes.some((i) => i._id === currentUser._id);
    const updatedCards = cards.map((c) => {
      if (c._id === card._id) {
        return {
          ...c,
          likes: isLiked
            ? likes.filter((i) => i._id !== currentUser._id)
            : [...likes, currentUser],
        };
      }
      return c;
    });
    setCards(updatedCards);
  }
  async function handleCardDelete() {
    if (!cardToDelete) {
      return;
    }
    setCards((prevCards) =>
      prevCards.filter((card) => card._id !== cardToDelete._id)
    );
    setCardToDelete(null);
    setIsDeletePopupOpen(false);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit({ link, name }) {
    const newCard = {
      _id: Date.now().toString(),
      link,
      name,
      isLiked: false,
      likes: [],
    };
    setCards((prevCards) => [newCard, ...prevCards]);
    closeAllPopups();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const handleUpdateAvatar = (data) => {
    console.log("Actualizando avatar:", data);
  };

  function onUpdateUser(user) {
    setCurrentUser(user);
    closeAllPopups();
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
  }

  const handleSignup = async (email, password) => {
    const result = await signup(email, password);
    if(result.success) {
      setTooltipMessage("Registro exitoso");
      setInfoTooltipOpen(true);
      setIsAuthenticated(true);
    }
  };

  const handleSignin = async (email, password) => {
    const result = await signin(email, password);
    if(result.success) {
      setIsAuthenticated(true);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
     
      <div className="page">
        <Header />
        <Routes>        
           <Route path="/signup" element={<Register onRegister={handleSignup} />} />         
           <Route path="/signin" element={<Login onLogin={handleSignin} />} />
            
          <ProtectedRoute 
            path="/"
            element={
        <>

        <Main
          cards={cards}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeletePopupClick}

        />

        <EditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={onUpdateUser}
        />

        <ConfirmDeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
        ></ConfirmDeletePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        ></AddPlacePopup>

        <EditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />        
         </>           
         }          
        isAuthenticated={isAuthenticated}       
        />        
         <Route path="*" element={<Navigate to="/signin" />} />    
        </Routes>        
        <InfoTooltip        
           isOpen={infoTooltipOpen}         
           message={tooltipMessage}         
           onClose={() => setInfoTooltipOpen(false)}      
           />      
         <Footer />     
         </div>   
          
       </CurrentUserContext.Provider>
      );
     }
                      
     export default App;

