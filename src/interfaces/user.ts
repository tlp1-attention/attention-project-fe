import { PreferencesAttributes } from "./preferences";

export interface IUser {
    name: string;
    email: string;
    ocupation: string;
    preferences?: PreferencesAttributes[];
    description?: string;
    problem?: string;
}