import { useState, useEffect } from "react";
import TeamCard from "../components/TeamCard";
import "./HomePage.scss";

const HomePage = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/team`)
      .then((response) => response.json())
      .then((teams) => setTeams(teams));
  }, []);

  return (
    <div className="HomePage">
      <h1 className="title">IPL Dashboard based on Java Brains Tutorial</h1>
      <div className="team-card">
        {teams.map((team) => (
          <TeamCard key={team.id} teamName={team.name} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
