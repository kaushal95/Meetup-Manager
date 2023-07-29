import "./Card.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getFormattedDate } from "../utils/util";

export default function Card({ meetup }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, time } = getFormattedDate(meetup.eventStartTime);
  const handleClick = () => {
    const path = location.pathname + meetup.id;
    navigate(path);
  };
  return (
    <article className="card-article" onClick={handleClick}>
      <div className="card-img-container">
        <img src={meetup.eventThumbnail} alt="event-thumbnail" />
      </div>
      <div className="card-date-container">
        <p>
          {date} <span className="date-time-separator"></span> {time}
        </p>
      </div>
      <div className="card-title-container">
        <h3>{meetup.title}</h3>
      </div>
      <button className="event-type-btn btn">{meetup.eventType} Event</button>
    </article>
  );
}
