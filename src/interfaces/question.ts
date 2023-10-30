import { IResponse } from "./options";

export interface IQuestion {
  id: number;
  text: string;
  exerciseId: number;
  createdAt: Date;
  updatedAt: Date;

  response: IResponse[];
}