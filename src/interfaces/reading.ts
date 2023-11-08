export interface IReading {
  id: number;
  read: string;
  readCoverPath: string;
  readSummary: string;
  readTitle: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReadingByWeek {
  weekNumber: number;
  startWeek: Date;
  endWeek: Date;
  readingCount: number;
}
