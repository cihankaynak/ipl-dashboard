import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchDetailCard from "../components/MatchDetailCard";

const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const { teamName, year } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((matches) => {
        setMatches(matches);
      });
  }, [teamName, year]);
  return (
    <div className="MatchPage">
      <h1>Match Page</h1>
      {matches.map((match) => (
        <MatchDetailCard key={match.id} match={match} team={teamName} />
      ))}
    </div>
  );
};

export default MatchPage;
