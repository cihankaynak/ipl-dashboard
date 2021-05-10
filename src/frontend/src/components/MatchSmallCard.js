import React from "react";
import { Link } from "react-router-dom";

const MatchSmallCard = ({ match, team }) => {
  const teamName = match.team1 === team ? match.team2 : match.team1;
  return (
    <div className="MatchSmallCard">
      <h3>
        vs <Link to={`/teams/${teamName}`}>{teamName}</Link>
      </h3>
      <p>
        {match.matchWinner} won by {match.resultMargin} {match.result}
      </p>
    </div>
  );
};

export default MatchSmallCard;
