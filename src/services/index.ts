import { UpdateProfilePayload } from "@/types/userInfo.interface";
import requestWrapper from "./wrapper";

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
