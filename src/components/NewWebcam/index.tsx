import { Box, Button, Flex, Group, Modal, Title } from "@mantine/core";
import { videoHeight, videoWidth } from "./utils";
import useExercises from "./useExercises";

const NewWebcam = () => {
  const {
    handler: { handleCanPlay, openModal, closeModal, handleGoHome, handleSave },
    state: {
      canvasRef,
      exerciseCount,
      isVideoPlaying,
      videoRef,
      prediction,
      mediaStream,
      isModalOpened,
      exerciseType,
    },
  } = useExercises();

  if (!mediaStream) {
    return null;
  }

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
