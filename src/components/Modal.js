import { useState, useEffect } from "react";
import MeetupDetail from "../pages/MeetupDetail";
import "./Modal.css";

export default function Modal({ openModal, setOpenModal, meetup, isPaid }) {
  const [open, setOpen] = useState(openModal);
  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleClick = () => {
    meetup.rsvpd = true;
    setOpen(false);
    setOpenModal(false);
  };

  return (
    <>
      {open ? (
        <div className="modal-container">
          <div className="modal-content">
            <h3>Complete your RSVP</h3>
            <p>Fill in your personal information.</p>
            <div className="input-container">
              <label htmlFor="name" id="name-label">
                Name:
              </label>
              <input name="name" id="name" type="text" />
            </div>
            <div className="input-container">
              <label htmlFor="name" id="name-label">
                Email:
              </label>
              <input name="name" id="name" type="email" />
            </div>
            {isPaid ? <p>*You have to make the payment at the venue.</p> : null}
            <button className="rsvp-button form-btn" onClick={handleClick}>
              RSVP
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setOpen(false);
                setOpenModal(false);
              }}
            >
              x
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
