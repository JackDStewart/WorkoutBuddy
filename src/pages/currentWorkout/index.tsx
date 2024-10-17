import { useRouter } from "next/router";
import React from "react";
import Header from "@/components/Header";

const CurrentWorkout: React.FC = () => {
  const router = useRouter();
  const { workout } = router.query; // Get the selected workout from query parameters

  return (
    <div>
      <Header></Header>
      <h1>Current Workout</h1>
      {workout && <p>You selected: {workout}</p>} {/* Display selected workout */}
    </div>
  );
};

export default CurrentWorkout;
