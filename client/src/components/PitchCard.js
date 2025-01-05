import React from "react";
import { Link } from "react-router-dom";

const PitchCard = ({ pitch }) => {
  return (
    <Link to={`/pitch/${pitch._id}`} className="block">
      <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <img
          src={pitch.photo || "https://via.placeholder.com/300"}
          alt={pitch.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <h2 className="text-xl font-semibold mt-2">{pitch.name}</h2>
        <p className="text-gray-600">{pitch.city}</p>
        <p className="text-gray-500">{pitch.address}</p>
      </div>
    </Link>
  );
};

export default PitchCard;
