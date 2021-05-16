import React from "react";
import { Link } from "react-router-dom";
import "./MatchSmallCard.scss";

const MatchSmallCard = ({ match, team }) => {
  const teamName = match.team1 === team ? match.team2 : match.team1;
  const isWon = team === match.matchWinner;
  const resultStyle = isWon ? "won-card" : "lost-card";
  return (
    <div className={`MatchSmallCard ${resultStyle}`}>
      <span>vs</span>
      <h1>
        <Link to={`/teams/${teamName}`}>{teamName}</Link>
      </h1>
      <p>
        {match.matchWinner} won by {match.resultMargin} {match.result}
      </p>
    </div>
  );
};

export default MatchSmallCard;
