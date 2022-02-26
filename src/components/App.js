// import './App.css';
import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Register from './Register'
import Login from './Login'
import InfoTooltip from './InfoTooltip'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/Api'
import * as ApiAuth from '../utils/ApiAuth'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {

  // Состояние попапа изменения профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  // Состояние попапа добавления карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  // Состояние попапа изменения аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  // Состояние попапа состояния регистрации
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false)

  // Выбранная карточка при клике на картинку
  const [selectedCard, setSelectedCard] = React.useState({})

  // Данные текущего пользователя
  const [currentUser, setСurrentUser] = React.useState({})

  // Данные карточек
  const [cards, setCards] = React.useState([])

  // Состояние логина пользователя
  const [loggedIn, setLoggedIn] = React.useState(false)

  // Состояние запроса на регистрацию пользователя
  const [regSuccess, setRegSuccess] = React.useState(false)

  // Данные пользователя
  const [userEmail, setUserEmail] = React.useState('')

  const history = useHistory()

  // Открыть попап изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  // Открыть попап изменения профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  // Открыть попап добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  // Закрыть все попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard({})
  }

  // Записать данные выбранной карточки в переменную состояния
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Поставить\убрать лайк карточке
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // Удаление карточки и возвращения массива без нее
  function handleCardDelete(card) {
    api.deleteUserCard(card._id)
      .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // Отправляем новые данные пользователя на сервер
  function handleUpdateUser(data) {
    api.editProfile(data.name, data.about)
      .then((res) => {
        setСurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Отправляем новые данные аватара на сервер
  function handleUpdateAvatar(data) {
    api.changeAvatar(data.avatar)
      .then((res) => {
        setСurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Сабмит добавления карточки
  function handleAddPlaceSubmit(data){
    api.addUserCard(data.name, data.link)
      .then((card) => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Получаем данные профиля и записываем в активного пользователя при монтировании
  React.useEffect(() => {
    api.getProfile()
      .then((data) => {
        setСurrentUser(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Получаем карточки с сервера
  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Проверка токена в локальном хранилище
  React.useEffect(() => {
    CheckToken();
  }, [loggedIn]);

  // Отправляем данные нового пользователя и отображаем статус
  function handleRegister(email, password) {
    ApiAuth.register(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true)
          setRegSuccess(true)
          setIsInfoTooltipPopupOpen(true)
          history.push('/sign-in')
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true)
        setRegSuccess(false)
        return console.log(err)
      })
  }

  //  Авторизуем пользователя
  function handleAuthorization(email, password) {
    ApiAuth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          setUserEmail(email)
          history.push('/')
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true)
        setRegSuccess(false)
        return console.log(err)
      })
  }

  //Выход из аккаунта
  function handleLogOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setUserEmail('')
    history.push('/sign-in')
  }

  // Проверка токена для автоматического входа
  function CheckToken() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      ApiAuth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setUserEmail(res.data.email)
            history.push('/')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // Рендер
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">

        <Header userEmail={userEmail} onLogOut={handleLogOut}/>
        <Switch>
          <ProtectedRoute
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            path='/'
            component={Main}
            loggedIn={loggedIn}
            exact
          />

          <Route path='/sign-up'>
            <Register onRegister={handleRegister}/>
          </Route>

          <Route path='/sign-in'>
            <Login onLogin={handleAuthorization}/>
          </Route>
          <Footer/>
        </Switch>

        <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        isSuccess={regSuccess}
        />

        {/* Попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          /> 

        {/* Попап добавления карточки */}
        <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup 
          name="image"
          isOpen={!!selectedCard.name && !!selectedCard.link}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
