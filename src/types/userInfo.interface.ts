export interface UserInfo {
  id: string;
  username: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  sex: "female" | "male" | null;
}
