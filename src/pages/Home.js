import "./Home.css";
import Card from "../components/Card";

export default function Home({ meetups }) {
  return (
    <main className="home-main">
      <h1 className="home-title">Meetup Events</h1>
      <div className="meetup-list">
        {meetups.map((meetup) => (
          <Card meetup={meetup} key={meetup.id} />
        ))}
      </div>
    </main>
  );
}
