import React from "react";
import registrationRegected from "../images/failedLogin.svg";
import registrationApproved from "../images/successfulLogin.svg";

const InfoTooltip = ({ success, isOpen, onClose }) => {
  return (
    <div className={`popup popup-info-tools ${isOpen && "popup_opened"}`}>
      <div className=" info-tools">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={onClose}
        ></button>
        <div className="info-tools__container">
          <img
            className="info-tools__img"
            src={success === true ? registrationApproved : registrationRegected}
            alt="Логотип"
          />
          <h3 className="info-tools__note">
            {success === true
              ? "Вы успешно зарегестрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
