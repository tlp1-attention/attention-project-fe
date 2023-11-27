import { request } from "./setup";

type GetAllReadingsParams = {
    token: string;
  };
  
  export async function getUserInf({
    token
  }: GetAllReadingsParams): Promise<{ readings: IReading[] }> {
    try {
      const response = await request.get("/api/exercises/readings", {
        headers: {
          Authorization: token
        }
      });
      const { exercises } = response.data;
  
      return {
        readings: exercises
      };
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err;
        if (response?.status == 400) {
          const { errors } = response.data;
          throw errors.map(
            ({ msg }: { msg: string }) => new ValidationError(msg)
          )[0];
        } else if (response?.status == 404) {
          return {
            readings: []
          };
        }
        throw new ValidationError(err.response?.data.message);
      }
      console.error(err);
      return { readings: [] };
    }
  }