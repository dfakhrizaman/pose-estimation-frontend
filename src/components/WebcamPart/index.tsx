import { Box, Text } from "@mantine/core";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as posenet from "@tensorflow-models/posenet";
import { draw, videoHeight, videoWidth } from "../NewWebcam/utils";
import { Pose, PoseNet } from "@tensorflow-models/posenet";
import usePosenet from "@/hooks/usePosenet";

export const config: posenet.ModelConfig = {
  architecture: "MobileNetV1",
  outputStride: 16,
  inputResolution: { width: 300, height: 300 },
  multiplier: 0.75,
  quantBytes: 2,
};

const WebcamPart = ({ isCameraOpen }: { isCameraOpen: boolean }) => {
  const webcamRef = useRef<Webcam>(null);
  const videoRef: HTMLVideoElement | null | undefined = webcamRef.current?.video;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posenetRef = useRef<PoseNet>();

  const [webcamActive, setWebcamActive] = useState(false);

  const poses = usePosenet(videoRef);

  const runPosenet = async () => {
    posenetRef.current = await posenet.load({ ...config });
  };

  useEffect(() => {
    if (!webcamRef || !videoRef) {
      return;
    }

  }, [webcamActive])

  draw(canvasRef.current, videoRef!, poses);

  return (
    <div>

      {!webcamActive && <Text>Loading Camera</Text>}

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >

        <Webcam
          ref={webcamRef}
          style={{
            zIndex: 1,
          }}
          onUserMedia={async (stream) => {
            await runPosenet();

            setWebcamActive(stream.active);
          }}
          width={videoWidth}
          height={videoHeight}
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
    </div>
  );
};

export default WebcamPart;