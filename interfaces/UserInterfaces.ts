import { roleTypes } from "../types/roleTypes.ts";

export default interface UserInterfaces{
    _id: { $oid: string} | null;
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    phoneNumber?: string;
    dateNaiss: Date;
    role: roleTypes;

    fullName(): string;
    getAge(): Number;
    insert(): Promise<void>;
    update(): Promise < any >;
    delete(): Promise < any >;
}