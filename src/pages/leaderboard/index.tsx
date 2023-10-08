import ActivityItem from "@/components/ActivityItem";
import { Title } from "@mantine/core";
import React from "react";

const LeaderboardPage = () => {
  return (
    <div>
      <Title order={1}>Leaderboard</Title>
      <ActivityItem />
    </div>
  );
};

export default LeaderboardPage;
