import React from "react";
import { useEffect, useState } from "react";

import MatchDetailCard from "../components/MatchDetailCard";
import MatchSmallCard from "../components/MatchSmallCard";

const TeamPage = () => {
  const fetchMatches = async () => {
    const response = await fetch("http://localhost:8080/team/Delhi%20Capitals");
    const data = await response.json();
    setTeam(data);
  };

  const [team, setTeam] = useState({ name: "", matches: [] });

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="TeamPage">
      <h1>{team.name}</h1>
      <h2>Latest Matches</h2>
      {team.matches.length > 0 && <MatchDetailCard match={team.matches[0]} />}
      {team.matches.length > 1 &&
        team.matches
          .slice(1)
          .map((match) => <MatchSmallCard key={match.id} match={match} />)}
    </div>
  );
};

export default TeamPage;
