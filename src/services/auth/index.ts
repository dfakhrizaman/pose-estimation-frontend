import { authRequest } from "../wrapper";

export const login = (data: { username: string; password: string }) =>
  authRequest({
    url: "/auth/login",
    method: "POST",
    data,
  });

export const register = (data: { username: string; password: string }) =>
  authRequest({
    url: "/users/register",
    method: "POST",
    data,
  });
