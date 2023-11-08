export interface IResponse {
  id: number;
  response: string;
  correct: boolean;
  createdAt: Date;
  updatedAt: Date;
  questionId: number;
}