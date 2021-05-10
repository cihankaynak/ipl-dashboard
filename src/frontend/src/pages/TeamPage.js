import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MatchDetailCard from "../components/MatchDetailCard";
import MatchSmallCard from "../components/MatchSmallCard";

const TeamPage = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState({ name: "", matches: [] });
  const [status, setStatus] = useState("Loading team...");

  useEffect(() => {
    const fetchMatches = () => {
      fetch(`http://localhost:8080/team/${teamName}`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((team) => {
          setTeam(team);
          setStatus("");
        })
        .catch((err) => setStatus("Team failed to load!"));
    };
    fetchMatches();
  }, [teamName]);

  return (
    <div className="TeamPage">
      {status && <h1>{status}</h1>}
      <h1>{team.name}</h1>
      {!status && <h2>Latest Matches</h2>}
      {team.matches.length > 0 && (
        <MatchDetailCard match={team.matches[0]} team={team.name} />
      )}
      {team.matches.length > 1 &&
        team.matches
          .slice(1)
          .map((match) => (
            <MatchSmallCard key={match.id} match={match} team={team.name} />
          ))}
    </div>
  );
};

export default TeamPage;
