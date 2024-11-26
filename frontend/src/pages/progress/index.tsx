import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { SingleAutocomplete } from "@/components/Autocomplete";
import ProgressChart from "@/components/ProgressChart";
import {
  fetchExercisesUserHasDone,
  fetchExerciseLogs,
} from "@/api/exerciseLogApi";
import { Exercise, ExerciseLogDTO, User } from "@/types";
import ProfileClient from "@/components/ProfileClient";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import ProgressPage from "./progress";

const Progress = () => {
  const { user: Auth0user } = useUser();

  if (!Auth0user) {
    alert("Please try again.");
    return <div>Loading...</div>; // or handle unexpected scenarios
  }

  const user: User = {
    name: Auth0user.name!,
    email: Auth0user.email!,
    id: Auth0user.sub!.substring(14),
  };

  return (
    <div>
      <Header />
      <ProfileClient />
      <br />
      <ProgressPage user={user} />
    </div>
  );
};

export default withPageAuthRequired(Progress);
