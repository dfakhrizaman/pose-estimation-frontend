import ActivityItem from "@/components/ActivityItem";
import LeaderboardItem from "@/components/LeaderboardItem";
import { getLocalStorageItem } from "@/helpers/localStorage";
import {
  getExercises,
  getUsersByLatest,
  getUsersLeaderboard,
} from "@/services";
import { Flex, Loader, Tabs, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

const ActivitiesPage = () => {
  // const [exercises, setExercises] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [usersByLatest, setUsersByLatest] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await getLocalStorageItem("access_token");

      // try {
      //   const { data } = await getUsersByLatest(token);

      //   setExercises(data);
      // } catch (error) {
      //   console.log(error);
      // }

      try {
        const { data } = await getUsersLeaderboard(token);

        setLeaderboard(data);
      } catch (error) {
        console.log(error);
      }

      try {
        const { data } = await getUsersByLatest(token);

        setUsersByLatest(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const renderActivities = () => {
    return usersByLatest.map((exercise) => (
      <ActivityItem
        key={exercise.user_id}
        duration={exercise.exercise_duration}
        score={exercise.exercise_score}
        type={exercise.exercise_type}
        completed_at={exercise.latest_completed_at}
        username={exercise.user_username}
      />
    ));
  };

  const renderLeaderboard = () => {
    return leaderboard.map((item, index) => (
      <LeaderboardItem
        key={item.user_id}
        number={index + 1}
        username={item.username}
        userId={item.user_id}
        count={item.exercise_count}
      />
    ));
  };

  return (
    <div>
      <Title order={1}>Other&apos;s Activities</Title>

      {isLoading ? (
        <Flex sx={{ justifyContent: "center" }}>
          <Loader />
        </Flex>
      ) : (
        <Tabs defaultValue="leaderboard">
          <Tabs.List>
            <Tabs.Tab value="leaderboard">Leaderboard</Tabs.Tab>
            <Tabs.Tab value="activities">Latest Activities</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="leaderboard">{renderLeaderboard()}</Tabs.Panel>
          <Tabs.Panel value="activities">{renderActivities()}</Tabs.Panel>
        </Tabs>
      )}
    </div>
  );
};

export default ActivitiesPage;
