import requestWrapper from "./wrapper";

export const getUserInfo = (token: string) =>
  requestWrapper({
    url: `users/profile`,
    method: "GET",
    token,
  });
