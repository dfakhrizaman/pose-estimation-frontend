export interface SubmitExercisePayload {
  type: "jumping_jack" | "squats";
  duration: number;
  score: number;
}
