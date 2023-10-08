/* eslint-disable react/no-unescaped-entities */
import NewWebcam from "@/components/NewWebcam";
import { Button, Flex, Group, Title } from "@mantine/core";
import React, { useState } from "react";

const ExercisePage = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <Flex
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Group
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => setIsCameraOpen(true)}>Start Camera</Button>
        <Button onClick={() => setIsCameraOpen(false)}>Turn Off Camera</Button>
      </Group>

      <Flex
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isCameraOpen ? (
          <Flex sx={{ flexGrow: 1 }}>
            <NewWebcam />
          </Flex>
        ) : (
          <Group
            sx={{
              marginTop: 80,
            }}
          >
            <Title sx={{ textAlign: "center", alignSelf: "center" }}>
              Press the start button whenever you're ready!
            </Title>
          </Group>
        )}
      </Flex>
    </Flex>
  );
};

export default ExercisePage;
