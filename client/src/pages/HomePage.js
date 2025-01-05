import React, { useEffect, useState } from "react";
import API from "../api/axios";
import PitchCard from "../components/PitchCard";

const Home = () => {
  const [pitches, setPitches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const res = await API.get("/pitches");
        setPitches(res.data);
      } catch (err) {
        setError("Failed to load pitches");
      }
    };
    fetchPitches();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
        Available Pitches
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pitches.map((pitch) => (
          <PitchCard key={pitch._id} pitch={pitch} />
        ))}
      </div>
    </div>
  );
};

export default Home;
