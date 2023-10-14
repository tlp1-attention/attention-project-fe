import { ValidationError } from "@interfaces/validation.error";
import axios, { AxiosError } from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const request = axios.create({
  baseURL: BACKEND_URL
});

type LoginParams = {
  username: string;
  password: string;
};

export async function loginUser({ username, password }: LoginParams) {
  try {
    const response = await request.post("/login", {
      username,
      password
    });

    return response.data;

  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(({ msg }: { msg: string }) => new ValidationError(msg))[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
    
  }
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
  try {
    const response = await request.post("/register", {
      username,
      password,
      email
    });

    return response.data;

  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(({ msg }: { msg: string }) => new ValidationError(msg))[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
    
  }
}

export async function getUserInfo(token: string) {
  try {

    const response = await request.get("/api/users", { 
      headers: {
        'Authorization': token
      }
    });

    return response.data;

  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(({ msg }: { msg: string }) => new ValidationError(msg))[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}