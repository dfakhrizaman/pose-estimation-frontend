import * as posenet from "@tensorflow-models/posenet";
import { useEffect, useRef, useState } from "react";
import { drawKeypoints, drawSkeleton } from "@/helpers/posenetHelper";
import { Box, Button } from "@mantine/core";
import { multiPoseDetection, usePoseNet } from "./hook";

const videoWidth = 500;
const videoHeight = 500;

async function setupCamera(video: any) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Browser API navigator.mediaDevices.getUserMedia not available");
  }

  video.width = videoWidth;
  video.height = videoHeight;

  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: videoWidth,
        height: videoHeight,
      },
    })
    .then(function (stream) {
      video.srcObject = stream;
    });
}

function stopCamera(video: HTMLVideoElement): void {
  if (video.srcObject) {
    const stream: MediaStream | null = video.srcObject as MediaStream;
    const tracks: MediaStreamTrack[] = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  }
}

function predict(poses: posenet.Pose[]) {
  const maxPose: posenet.Pose = poses.reduce(
    (a, b) => (a.score > b.score ? a : b),
    {
      score: 0,
    } as posenet.Pose
  );
  if (maxPose.score === 0) {
    return { className: "-", probability: 1 };
  } else {
    const rightShoulder = maxPose.keypoints.filter(
      (k) => k.part === "rightShoulder"
    )[0];
    const rightElbow = maxPose.keypoints.filter(
      (k) => k.part === "rightElbow"
    )[0];
    const rightWrist = maxPose.keypoints.filter(
      (k) => k.part === "rightWrist"
    )[0];

    const xdiff =
      rightWrist.position.x.valueOf() - rightElbow.position.x.valueOf();
    const ydiff =
      rightElbow.position.y.valueOf() - rightWrist.position.y.valueOf();
    const ratio = ydiff / xdiff;
    if (rightWrist.score < 0.15 || rightElbow.score < 0.15) {
      return { className: "Too Close", probability: rightShoulder.score };
    }
    if (ydiff < 0 && Math.abs(ratio) > 1) {
      return {
        className: "Please raise your wrist",
        probability: rightShoulder.score,
      };
    }
    if (ydiff > 0 && Math.abs(ratio) > 3) {
      return { className: "Up", probability: rightWrist.score };
    }
    if (xdiff > 0 && Math.abs(ratio) < 0.57) {
      return { className: "To the right", probability: rightWrist.score };
    }
    if (xdiff < 0 && Math.abs(ratio) < 0.57) {
      return { className: "To the left", probability: rightWrist.score };
    }
    return { className: "-", probability: rightShoulder.score };
  }
}

function draw(
  canvas: HTMLCanvasElement | null,
  video: HTMLVideoElement | null,
  poses: posenet.Pose[]
) {
  if (canvas === null || video === null) {
    return;
  }
  const ctx = canvas.getContext("2d");
  if (ctx === null) {
    return;
  }
  ctx.save();
  ctx.scale(-1, 1);
  ctx.translate(-videoWidth, 0);
  ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
  ctx.restore();

  poses.forEach(({ score, keypoints }) => {
    if (score >= multiPoseDetection.minPoseConfidence) {
      drawKeypoints(keypoints, multiPoseDetection.minPartConfidence, ctx);
      drawSkeleton(keypoints, multiPoseDetection.minPartConfidence, ctx);
      //drawBoundingBox(keypoints, ctx);
    }
  });
}

const WebcamFrame = () => {
  const [status, setStatus] = useState<"initial" | "running" | "paused">(
    "initial"
  );
  const [hint, setHint] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const poses = usePoseNet(videoRef.current!);

  useEffect(() => {
    (async () => {
      await setupCamera(videoRef.current);
    })();
  }, []);

  // const prediction = predict(poses);
  draw(canvasRef.current, videoRef.current, poses);

  // useEffect(() => {
  //   const delayedHintUpdate = async () => {
  //     if (!prediction) {
  //       return;
  //     }

  //     // Introduce a 1-second (1000 milliseconds) delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Set the hint after the delay
  //     setHint(prediction.className);
  //   };

  //   delayedHintUpdate(); // Call the async function to start the delay

  //   // Any cleanup code or dependencies can go here
  //   // For example, return a cleanup function if needed
  //   return () => {
  //     // Cleanup code here
  //   };
  // }, [prediction]);

  // useEffect(() => {
  //   if (!prediction || !prediction.className || !prediction.probability) {
  //     return;
  //   }
  //   setHint(prediction.className);
  // }, [prediction]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Button
          onClick={(e) => {
            setStatus("running");
            videoRef.current!.play();
          }}
        >
          Start
        </Button>
        <Button
          onClick={(e) => {
            setStatus("paused");
            videoRef.current!.pause();
            stopCamera(videoRef.current!);
          }}
        >
          Stop
        </Button>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <video
          ref={videoRef}
          width={videoWidth}
          height={videoHeight}
          style={{ display: "none" }}
          playsInline={true}
          data-testid="webcam-video"
        />
        <canvas
          ref={canvasRef}
          width={videoWidth}
          height={videoHeight}
          data-testid="canvas-layer"
        />
        <h4>Instruction: {hint}</h4>
        {/* <h4>Score: {Math.round(prediction.probability * 100)}%</h4> */}
      </div>
    </Box>
  );
};

export default WebcamFrame;
