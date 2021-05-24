import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";

import MatchDetailCard from "../components/MatchDetailCard";
import MatchSmallCard from "../components/MatchSmallCard";

import "./TeamPage.scss";

const TeamPage = () => {
  const { teamName } = useParams();
  const [team, setTeam] = useState({
    name: "",
    matches: [],
    totalWins: 0,
    totalMatches: 0,
  });
  const [status, setStatus] = useState("Loading team...");

  useEffect(() => {
    const fetchMatches = () => {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/team/${teamName}`)
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
      <div className="home-link">
        <h1>
          <Link to="/">Home</Link>
        </h1>
      </div>
      <div className="team-name-section">
        <h1 className="team-name">{team.name}</h1>
      </div>
      <div className="win-loss-section">
        <PieChart
          data={[
            {
              title: "Losses",
              value: team.totalMatches - team.totalWins,
              color: "#a34d5d",
            },
            { title: "Wins", value: team.totalWins, color: "#4da375" },
          ]}
          label={({ dataEntry }) => `${dataEntry.value} ${dataEntry.title}`}
          labelStyle={{
            fontSize: "10px",
            fontColor: "FFFFFA",
          }}
        />
      </div>
      <div className="match-detail-section">
        <h3>Latest Matches</h3>
        {team.matches.length > 0 && (
          <MatchDetailCard match={team.matches[0]} team={team.name} />
        )}
      </div>
      {team.matches.length > 1 &&
        team.matches
          .slice(1)
          .map((match) => (
            <MatchSmallCard key={match.id} match={match} team={team.name} />
          ))}
      <div className="more-link">
        <Link
          to={`/teams/${team.name}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}
        >
          More >
        </Link>
      </div>
    </div>
  );
};

export default TeamPage;
