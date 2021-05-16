import React from "react";
import { Link } from "react-router-dom";

import "./MatchDetailCard.scss";

const MatchDetailCard = ({ match, team }) => {
  const teamName = match.team1 === team ? match.team2 : match.team1;
  const isWon = team === match.matchWinner;
  const resultStyle = isWon ? "won-card" : "lost-card";
  return (
    <div className={`MatchDetailCard ${resultStyle}`}>
      <div>
        <span className="vs">vs</span>
        <h1>
          <Link to={`/teams/${teamName}`}>{teamName}</Link>
        </h1>
        <h2 className="match-date">{match.date}</h2>
        <h3 className="match-venue">{match.venue}</h3>
        <h3 className="match-result">
          {match.matchWinner} won by {match.resultMargin} {match.result}
        </h3>
      </div>
      <div className="additional-detail">
        <h3>First Innings</h3>
        <p>{match.team1}</p>
        <h3>Second Innings</h3>
        <p>{match.team2}</p>
        <h3>Man of the match</h3>
        <p>{match.playerOfMatch}</p>
        <h3>Umpires</h3>
        <p>
          {match.umpire1}, {match.umpire2}
        </p>
      </div>
    </div>
  );
};

export default MatchDetailCard;
