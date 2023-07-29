import { useParams } from "react-router-dom";
import "./MeetupDetail.css";

import { getFormattedDate } from "../utils/util";
import { useState } from "react";
import Modal from "../components/Modal";

export default function MeetupDetail({ meetups }) {
  const { meetupId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const meetup = meetups.find((el) => el.id === meetupId);

  return (
    <div className="main-container">
      {openModal ? (
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          isPaid={meetup.isPaid}
          meetup={meetup}
          rsvpd={meetup?.rspvd}
        />
      ) : null}
      <main>
        <article>
          <div className="even-title-hosts">
            <h1>{meetup.title}</h1>
            <div className="event-host-detail">
              <p>Hosted By:</p>
              <p>{meetup.hostedBy}</p>
            </div>
          </div>
          <div className="event-img">
            <img src={meetup.eventThumbnail} alt={meetup.title} />
          </div>
          <div className="event-desc">
            <h3>Details:</h3>
            <p>{meetup.eventDescription}</p>
          </div>
          {meetup?.additionalInformation ? (
            <div className="event-additional-info">
              <h3>Additional Info:</h3>
              {meetup.additionalInformation?.dressCode ? (
                <div>
                  <span>{"Dress Code : "}</span>
                  <span>{meetup.additionalInformation?.dressCode}</span>
                  <br />
                </div>
              ) : null}
              {meetup.additionalInformation?.ageRestrictions ? (
                <div>
                  <span>{"Age Restriction : "}</span>
                  <span>{meetup.additionalInformation?.ageRestrictions}</span>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="event-tags">
            <h3>Event Tags :</h3>
            {meetup?.eventTags.map((tag, index) => (
              <span key={tag + index} className="tag-pill pill">
                {tag}
              </span>
            ))}
          </div>
        </article>
      </main>
      <aside>
        <TimeCard
          eventStartTime={meetup.eventStartTime}
          eventEndTime={meetup.eventEndTime}
          location={meetup.location}
          address={meetup.address}
          price={meetup.price}
        />
        {meetup?.speakers?.length ? (
          <>
            <h3>{`Speakers: (${meetup.speakers.length})`}</h3>
            <div className="speakers-container">
              {meetup.speakers.map((speaker, index) => (
                <SpeakerCard key={speaker.name + index} speaker={speaker} />
              ))}
            </div>
          </>
        ) : null}
        {new Date() < new Date(meetup.eventStartTime) ? (
          meetup.rsvpd ? (
            <button className="rsvp-button btn" disabled={true}>
              Already RSVPed
            </button>
          ) : (
            <button
              className="rsvp-button btn"
              onClick={() => setOpenModal(true)}
            >
              {"RSVP"}
            </button>
          )
        ) : null}
      </aside>
    </div>
  );
}
function SpeakerCard({ speaker }) {
  return (
    <div className="speaker-card">
      <div className="speaker-image-container">
        <img src={speaker.image} alt={`speaker-${speaker.image}`} />
      </div>
      <div className="speaker-detail">
        <p>{speaker.name}</p>
        <p>{speaker.designation}</p>
      </div>
    </div>
  );
}
function TimeCard({ eventStartTime, eventEndTime, location, address, price }) {
  const { date: startDate, time: startTime } = getFormattedDate(eventStartTime);
  const { date: endDate, time: endTime } = getFormattedDate(eventEndTime);

  return (
    <>
      <div className="event-whereabouts-container">
        <div className="event-whereabout-info">
          <span className="material-icons md-16">schedule</span>
          <div>
            <p>
              {startDate} at {startTime} to
            </p>
            <p>
              {endDate} at {endTime}
            </p>
          </div>
        </div>
        <div className="event-whereabout-info">
          <span className="material-icons md-16">location_on</span>
          <div>
            <p>{location}</p>
            <p>{address}</p>
          </div>
        </div>
        {price ? (
          <div className="event-whereabout-info">
            <span className="material-icons md-16">currency_rupee</span>

            <div>
              <p>{price}</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
