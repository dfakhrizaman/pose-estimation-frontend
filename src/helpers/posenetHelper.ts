import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";

const color: string = "aqua";
const boundingBoxColor: string = "red";
const lineWidth: number = 2;

export const tryResNetButtonName: string = "tryResNetButton";
export const tryResNetButtonText: string = "[New] Try ResNet50";

/**
 * Toggles between the loading UI and the main canvas UI.
 */
export function toggleLoadingUI(
  showLoadingUI: boolean,
  loadingDivId: string = "loading",
  mainDivId: string = "main"
): void {
  if (showLoadingUI) {
    document.getElementById(loadingDivId)!.style.display = "block";
    document.getElementById(mainDivId)!.style.display = "none";
  } else {
    document.getElementById(loadingDivId)!.style.display = "none";
    document.getElementById(mainDivId)!.style.display = "block";
  }
}

function toTuple({ y, x }: { y: number; x: number }): [number, number] {
  return [y, x];
}

export function drawPoint(
  ctx: CanvasRenderingContext2D,
  y: number,
  x: number,
  r: number,
  color: string
): void {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment(
  [ay, ax]: [number, number],
  [by, bx]: [number, number],
  color: string,
  scale: number,
  ctx: CanvasRenderingContext2D
): void {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(
  keypoints: posenet.Keypoint[],
  minConfidence: number,
  ctx: CanvasRenderingContext2D,
  scale: number = 1
): void {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx
    );
  });
}

/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints(
  keypoints: posenet.Keypoint[],
  minConfidence: number,
  ctx: CanvasRenderingContext2D,
  scale: number = 1
): void {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}

/**
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
 */
export function drawBoundingBox(
  keypoints: posenet.Keypoint[],
  ctx: CanvasRenderingContext2D
): void {
  const boundingBox = posenet.getBoundingBox(keypoints);

  ctx.rect(
    boundingBox.minX,
    boundingBox.minY,
    boundingBox.maxX - boundingBox.minX,
    boundingBox.maxY - boundingBox.minY
  );

  ctx.strokeStyle = boundingBoxColor;
  ctx.stroke();
}

/**
 * Converts an array of pixel data into an ImageData object
 */
export async function renderToCanvas(
  a: tf.Tensor3D,
  ctx: CanvasRenderingContext2D
): Promise<void> {
  const [height, width] = a.shape;
  const imageData = new ImageData(width, height);

  const data = await a.data();

  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    const k = i * 3;

    imageData.data[j + 0] = data[k + 0];
    imageData.data[j + 1] = data[k + 1];
    imageData.data[j + 2] = data[k + 2];
    imageData.data[j + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

export function renderImageToCanvas(
  image: HTMLImageElement,
  size: [number, number],
  canvas: HTMLCanvasElement
): void {
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(image, 0, 0);
}

export function drawHeatMapValues(
  heatMapValues: tf.Tensor2D,
  outputStride: number,
  canvas: HTMLCanvasElement
): void {
  const ctx = canvas.getContext("2d")!;
  const radius = 5;
  const scaledValues = heatMapValues.mul(tf.scalar(outputStride, "int32"));

  drawPoints(ctx, scaledValues, radius, color);
}

function drawPoints(
  ctx: CanvasRenderingContext2D,
  points: any,
  radius: number,
  color: string
): void {
  const data = points.buffer().values;

  for (let i = 0; i < data.length; i += 2) {
    const pointY = data[i];
    const pointX = data[i + 1];

    if (pointX !== 0 && pointY !== 0) {
      ctx.beginPath();
      ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}
