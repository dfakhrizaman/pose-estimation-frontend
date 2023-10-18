import ActivityItem from "@/components/ActivityItem";
import { getLocalStorageItem } from "@/helpers/localStorage";
import { getExercises } from "@/services";
import { Flex, Loader, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

const ActivitiesPage = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await getLocalStorageItem("access_token");
        const { data } = await getExercises(token);

        setExercises(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Title order={1}>Other&#39;s Activities</Title>

      {isLoading && (
        <Flex sx={{ justifyContent: "center" }}>
          <Loader />
        </Flex>
      )}
      {exercises.map((exercise) => (
        <ActivityItem
          key={exercise.id}
          duration={exercise.duration}
          score={exercise.score}
          type={exercise.type}
          completed_at={exercise.completed_at}
          username={exercise.username}
        />
      ))}
    </div>
  );
};

export default ActivitiesPage;
