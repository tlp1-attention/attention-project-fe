import { PreferencesAttributes } from "./preferences";

export interface IUser {
    id: number;
    name: string;
    email: string;
    ocupation: string;
    preferences?: PreferencesAttributes[];
    description?: string;
    problem?: string;
    image?: string;
}