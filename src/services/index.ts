import { UpdateProfilePayload } from "@/types/userInfo.interface";
import requestWrapper from "./wrapper";
import { SubmitExercisePayload } from "@/types/exercise.interface";

export const getUserInfo = (token: string) =>
  requestWrapper({
    url: `users/profile`,
    method: "GET",
    token,
  });

export const updateProfile = (token: string, data: UpdateProfilePayload) =>
  requestWrapper({
    url: `users/update-profile`,
    method: "PATCH",
    token,
    data: {
      age: Number(data.age),
      height: Number(data.height),
      weight: Number(data.weight),
      sex: data.sex,
    },
  });

export const submitExercise = (token: string, data: SubmitExercisePayload) =>
  requestWrapper({
    url: `exercises/submit`,
    method: "POST",
    token,
    data: data,
  });

  export const getExercises = (token: string) =>
    requestWrapper({
      url: `exercises`,
      method: "GET",
      token,
    });