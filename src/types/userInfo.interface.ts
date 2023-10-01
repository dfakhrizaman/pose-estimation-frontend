export interface UserInfo {
  id: string;
  username: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  sex: "female" | "male" | null;
}

export type Sex = "male" | "female";

export interface UpdateProfilePayload {
  age: string;
  height: string;
  weight: string;
  sex?: Sex | null;
}