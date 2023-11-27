import { ValidationError } from "@interfaces/validation.error";
import { AxiosError } from "axios";
import { request } from "@services/setup";
import { IUser } from "@interfaces/user";

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
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
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
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}

export async function getUserInfo(
  token: string
): Promise<{ user: IUser | null }> {
  try {
    const response = await request.get("/api/users", {
      headers: {
        Authorization: token
      }
    });

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
    return { user: null };
  }
}

type UpdateUserParams = {
  token: string;
  userData: IUser;
};

export async function updateUserInfo({
  token,
  userData
}: UpdateUserParams): Promise<{ user: IUser | null }> {
  try {
    const response = await request.post("/api/users", userData, {
      headers: {
        Authorization: token
      }
    });

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
    return { user: null };
  }
}
