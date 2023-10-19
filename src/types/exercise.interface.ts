export interface SubmitExercisePayload {
  type: "jumping_jack" | "squat";
  duration: number;
  score: number;
}
