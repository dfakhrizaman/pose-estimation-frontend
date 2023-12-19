import {
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { videoHeight, videoWidth } from "./utils";
import useExercises from "./useExercises";
import { useState } from "react";
import { useUserInfo } from "@/states/UserInfoContext";

const NewWebcam = () => {
  const {
    handler: { handleCanPlay, openModal, closeModal, handleGoHome, handleSave },
    state: {
      canvasRef,
      exerciseCount,
      isVideoPlaying,
      videoRef,
      prediction,
      isModalOpened,
      exerciseType,
    },
  } = useExercises();

  const { userInfo } = useUserInfo();

  const [disableSave, setDisableSave] = useState(true);

  return (
    <>
      <Flex sx={{ columnGap: 40 }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <video
            ref={videoRef}
            hidden={!isVideoPlaying}
            onCanPlay={handleCanPlay}
            autoPlay
            muted
            data-testid="webcam-video"
            width={videoWidth}
            height={videoHeight}
            playsInline={true}
          />
          <canvas
            ref={canvasRef}
            data-testid="canvas-layer"
            style={{
              position: "absolute",
              zIndex: 2,
            }}
            width={videoWidth}
            height={videoHeight}
          />
        </Box>
        <Box>
          <h4>{prediction.message}</h4>
          <h2>
            {exerciseType === "squat" ? "Squats" : "Jumping Jacks"} Count:{" "}
            {exerciseCount}
          </h2>
          <Group
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <Button onClick={openModal}>End Exercise</Button>
          </Group>
        </Box>

        <Modal
          opened={isModalOpened}
          onClose={handleGoHome}
          centered
          title="Congratulation!"
        >
          <Title order={2}>
            You have finished {exerciseCount > 10 ? 10 : exerciseCount}/10{" "}
            {exerciseType === "squat" ? "Squats" : "Jumping Jacks"}!
          </Title>

          <Box my={20}>
            <Text>
              Please fill out the form below to enable the save button!
            </Text>
            <Anchor
              href={`https://docs.google.com/forms/d/e/1FAIpQLSej8tWVOdrk7oWapP-rT4fW_Vtf08icDAaPffQ4gJzsYOiz9A/viewform?usp=pp_url&entry.180179664=${userInfo.username}`}
              target="_blank"
              onClick={() => setDisableSave(false)}
            >
              Post-Exercise Form
            </Anchor>
          </Box>

          <Flex sx={{ justifyContent: "end" }}>
            <Group
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleGoHome}>Go Home</Button>
              <Button
                onClick={async () => {
                  await handleSave();
                  handleGoHome();
                }}
                disabled={disableSave}
              >
                Save and Go Home
              </Button>
            </Group>
          </Flex>
        </Modal>
      </Flex>
    </>
  );
};

export default NewWebcam;
