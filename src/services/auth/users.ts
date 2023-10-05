import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const request = axios.create({
  baseURL: BACKEND_URL
});

type LoginParams = {
  username: string;
  password: string;
};

export async function loginUser({ username, password }: LoginParams) {
  return request.post("/login", {
    username,
    password
  });
}

type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

export async function registerUser({
  username,
  email,
  password
}: RegisterParams) {
  return request.post("/register", {
    username,
    email,
    password
  });
}
