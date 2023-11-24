import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  average,
  draw,
  getDuration,
  predict,
  videoHeight,
  videoWidth,
} from "./utils";
import { useUserMedia } from "./useUserMediaStream";
import { usePoseNet } from "./usePosenet";
import { useDisclosure } from "@mantine/hooks";
import { submitExercise } from "@/services";
import { getLocalStorageItem } from "@/helpers/localStorage";
import { SubmitExercisePayload } from "@/types/exercise.interface";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "user", width: videoWidth, height: videoHeight },
};

const useExercises = () => {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [prediction, setPrediction] = useState({
    message: "loading",
    probability: 0,
  });
  const [exerciseCount, setExerciseCount] = useState(0);
  const [previousPrediction, setPreviousPrediction] = useState("");
  const [timeKeep, setTimeKeep] = useState<{
    startTime: Date | null;
    finishTime: Date | null;
  }>({
    startTime: null,
    finishTime: null,
  });
  const [accuracyList, setAccuracyList] = useState<number[]>([]);

  const { exerciseType } = router.query;

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [isModalOpened, { open: openFinishModal, close: closeModal }] =
    useDisclosure(false);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
    videoRef.current.width = videoWidth;
    videoRef.current.height = videoHeight;
  }

  function handleCanPlay() {
    if (!videoRef || !videoRef.current) {
      return;
    }

    setIsVideoPlaying(true);
    videoRef.current.play();
  }

  const openModal = () => {
    setTimeKeep({
      ...timeKeep,
      finishTime: new Date(),
    });
    openFinishModal();
  };

  const handleGoHome = () => {
    closeModal();
    router.push("/home");
  };

  const handleSave = async () => {
    try {
      const token = await getLocalStorageItem("access_token");

      const payload: SubmitExercisePayload = {
        type: exerciseType === "squat" ? "squat" : "jumping_jack",
        score: exerciseCount,
        duration: getDuration(timeKeep.startTime!, timeKeep.finishTime!),
      };

      const newPayload: SubmitExercisePayload = {
        ...payload,
        accuracy: average(accuracyList),
      };

      console.log(newPayload);

      submitExercise(token, payload);
    } catch (error) {
      console.log(error);
    }
  };

  const poses = usePoseNet(videoRef!.current!);

  draw(canvasRef.current, videoRef.current, poses);

  useEffect(() => {
    setTimeKeep({
      ...timeKeep,
      startTime: new Date(),
    });
  }, []);

  useEffect(() => {
    const newPrediction = predict(poses, exerciseType as string);
    setPrediction(newPrediction);
  }, [poses]);

  useEffect(() => {
    if (exerciseType === "squat") {
      if (
        prediction.message === "squatting" &&
        previousPrediction === "standing"
      ) {
        setExerciseCount((prevCount) => prevCount + 1);
        setAccuracyList((prev) => [...prev, prediction.probability]);
      }

      setPreviousPrediction(prediction.message);
    }

    if (exerciseType === "jumping-jack") {
      if (
        prediction.message === "hands-up" &&
        previousPrediction === "hands-down"
      ) {
        setExerciseCount((prevCount) => prevCount + 1);
        setAccuracyList((prev) => [...prev, prediction.probability]);
      }

      setPreviousPrediction(prediction.message);
    }
  }, [prediction.message]);

  useEffect(() => {
    if (exerciseCount >= 10) {
      openModal();
    }
  }, [exerciseCount]);

  return {
    state: {
      videoRef,
      canvasRef,
      isVideoPlaying,
      exerciseCount,
      prediction,
      mediaStream,
      isModalOpened,
      exerciseType,
      isCameraOpen,
      timeKeep,
    },
    handler: {
      handleCanPlay,
      openModal,
      closeModal,
      handleGoHome,
      setIsCameraOpen,
      handleSave,
    },
  };
};

export default useExercises;
