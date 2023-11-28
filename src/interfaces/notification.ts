import { ITypeNotification } from "./type-notification";

export type INotification = {
    id: number;
    title: string;
    content: string;
    read: boolean;
    userId: number;
    typeId: number;
    createdAt: Date;
    updatedAt: Date;

    type: ITypeNotification;
    /**
     * For collaboration notifications,
     * this attribute holds the user's ID that 
     * initiated the contact
     */
    requestedContactUserId: number | null;
}