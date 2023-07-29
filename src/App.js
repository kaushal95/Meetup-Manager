import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import data from "./data/data.json";
import Navbar from "./components/Navbar";
import MeetupDetail from "./pages/MeetupDetail";
import { useState } from "react";
export default function App() {
  const [meetups, setMeetups] = useState([...data.meetups]);
  const handleSearch = (searchText) => {
    if (!searchText) {
      setMeetups([...data.meetups]);
      return;
    }
    let meetupsArray = meetups.filter(
      (el) =>
        el.title.includes(searchText) ||
        el.eventTags.join("").includes(searchText)
    );
    setMeetups(meetupsArray);
  };
  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home meetups={meetups} />} />
        <Route path="/:meetupId" element={<MeetupDetail meetups={meetups} />} />
      </Routes>
    </>
  );
}
