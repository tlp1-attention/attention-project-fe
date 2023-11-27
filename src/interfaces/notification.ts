import { ITypeNotification } from "./type-notification";

export interface INotification {
    id: number;
    title: string;
    content: string;
    typeId: number;
    read: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;

    type: ITypeNotification;
}