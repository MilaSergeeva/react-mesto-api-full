import React from "react";

const PopupWithForm = (props) => {
  return (
    <div
      className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <div className="popup__content">
          <form
            method="POST"
            name="user-info"
            className="popup__form"
            onSubmit={props.onSubmit}
            noValidate
          >
            <h3 className="popup__title">{props.title}</h3>
            {props.children}
            <button
              type="submit"
              className="popup__btn-save"
              data-submitting-label="Saving..."
            >
              {props.savebtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupWithForm;
