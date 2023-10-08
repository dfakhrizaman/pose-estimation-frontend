import WebcamFrame from "@/components/WebcamFrame";
import { Flex, Paper, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const ExercisePage = () => {
  const router = useRouter();

  const { exerciseType } = router.query;

  return (
    <Flex>
      <Flex sx={{ flexGrow: 1 }}>
        <WebcamFrame />
      </Flex>

      <Paper sx={{ flexGrow: 1 }}>
        <Title order={2}>
          {exerciseType === "squat" ? "Squats" : "Jumping Jacks"}
        </Title>
        <Text>Counter:</Text>
      </Paper>
    </Flex>
  );
};

export default ExercisePage;
