import React from "react";
import { Link } from "react-router-dom";

import "./TeamCard.scss";

const TeamCard = ({ teamName }) => {
  return (
    <div className="TeamCard">
      <Link to={`/teams/${teamName}`}>
        <h1 className="team-name">{teamName}</h1>
      </Link>
    </div>
  );
};

export default TeamCard;
