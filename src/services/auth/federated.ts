import { ValidationError } from "@interfaces/validation.error";
import { request } from "@services/setup";
import { AxiosError } from "axios";

type LoginWithGoogleParams = {
  code: string;
};

export async function loginWithGoogle({
  code,
}: LoginWithGoogleParams): Promise<{ token: string; message: string }> {
  try {
    const response = await request.post("/auth/google", {
      code,
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
    return {
      token: "",
      message: ""
    };
  }
}
