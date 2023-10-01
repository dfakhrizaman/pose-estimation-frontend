import { UpdateProfilePayload, UserInfo } from "@/types/userInfo.interface";

export const initialUserInfo: UserInfo = {
  id: "",
  username: "",
  age: null,
  height: null,
  weight: null,
  sex: null,
};

export const initialUpdateProfilePayload: UpdateProfilePayload = {
  age: "",
  height: "",
  weight: "",
  sex: null,
};
