export type FormDefaultValues = {
  title: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  typeId: number;
};

export const EVENT_DEFAULT: FormDefaultValues = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    typeId: 1
};
  