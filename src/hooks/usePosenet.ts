import { multiPoseDetection } from "@/components/NewWebcam/usePosenet";
import * as posenet from "@tensorflow-models/posenet";
import { PoseNet } from "@tensorflow-models/posenet";
import { Pose, PosenetInput } from "@tensorflow-models/posenet/dist/types"
import { useEffect, useRef, useState } from "react"

export const config: posenet.ModelConfig = {
  architecture: "MobileNetV1",
  outputStride: 16,
  inputResolution: { width: 300, height: 300 },
  multiplier: 0.75,
  quantBytes: 2,
};


const usePosenet = (input: PosenetInput | null | undefined) => {
  const [poses, setPoses] = useState<Pose[]>([]);
  const net = useRef<PoseNet>();

  useEffect(() => {
    if (!input) return;

    (async () => {
      if (!input) {
        return [];
      }

      net.current = await posenet.load({ ...config });

      window.requestAnimationFrame(render(input, net.current, setPoses));
    })();

  }, [input])

  return poses
}

export default usePosenet

const render =
  (input: PosenetInput, net: PoseNet, setPoses: any) => async () => {
    try {
      const res = await net.estimatePoses(input, {
        flipHorizontal: true,
        decodingMethod: "multi-person",
        maxDetections: multiPoseDetection.maxPoseDetections,
        scoreThreshold: multiPoseDetection.minPartConfidence,
        nmsRadius: multiPoseDetection.nmsRadius,
      });

      setPoses(res);
    } catch (error) {
      console.log(error);

      return;
    }

    window.requestAnimationFrame(render(input, net, setPoses));
  };
