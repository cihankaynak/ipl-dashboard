import React from "react";
import { Link } from "react-router-dom";

const MatchDetailCard = ({ match, team }) => {
  const teamName = match.team1 === team ? match.team2 : match.team1;
  return (
    <div className="MatchDetailCard">
      <h1>
        vs <Link to={`/teams/${teamName}`}>{teamName}</Link>
      </h1>
      <h2>{match.date}</h2>
      <h3>{match.venue}</h3>
      <h3>
        {match.matchWinner} won by {match.resultMargin} {match.result}
      </h3>
    </div>
  );
};

export default MatchDetailCard;
