import React from 'react'
import RegSuccess_ok from '../images/RegSuccess_ok.svg'
import RegSuccess_err from '../images/RegSuccess_err.svg'

function InfoTooltip({isSuccess, isOpen, onClose,}) {

  return(
    <div className={`popup popup_type_info-Tooltip ${isOpen && 'popup_is-opened'}`}>
      <div className="infoTooltip">
        <button type="button"
        className="popup__btn-close popup__btn-close_type_card button"
        aria-label="кнопка закрытия всплывающего окна"
        onClick={onClose}></button>
        <div className="popup__content">
          <img
            className='infoTooltip__image'
            src={isSuccess ? RegSuccess_ok : RegSuccess_err}
            alt='статус регистрации'/>
          <h3 className="infoTooltip__title">
            {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip