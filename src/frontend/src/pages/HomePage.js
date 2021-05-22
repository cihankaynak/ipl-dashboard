import { useState, useEffect } from "react";
import TeamCard from "../components/TeamCard";
import "./HomePage.scss";

const HomePage = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/team")
      .then((response) => response.json())
      .then((teams) => setTeams(teams));
  }, []);

  return (
    <div className="HomePage">
      <h1 className="title">IPL Dashboard based on Java Brains Tutorial</h1>
      <div className="team-card">
        {teams.map((team) => (
          <TeamCard teamName={team.name} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
