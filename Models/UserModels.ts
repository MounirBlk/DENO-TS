import UserInterfaces from '../interfaces/UserInterfaces.ts';
import { UserDB } from "../db/userDb.ts";
import { hash } from "../helpers/password.helpers.ts";
import { userUpdateTypes } from "../types/userUpdateTypes.ts";
import { roleTypes } from '../types/roleTypes.ts';


export class UserModels extends UserDB implements UserInterfaces {
    [x: string]: any;
    private id: { $oid: string} | null = null;
    private _role: roleTypes = "User";
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    phoneNumber ? : string;
    dateNaiss: Date;

    constructor(email: string, password: string, nom: string, prenom: string, tel: string, dateNaiss: string) {
        super();
        this.email = email;
        this.lastname = nom;
        this.phoneNumber = tel;
        this.firstname = prenom;
        this.password = password;
        this.dateNaiss = new Date(dateNaiss);
    }

    get _id(): string | null{
        return (this.id === null) ? null : this.id.$oid;
    }
    get role(): roleTypes{
        return this._role;
    }
    async insert(): Promise<void> {
        this.password = await hash(this.password);
        this.id = await this.userdb.insertOne({
            role: this._role,
            email: this.email,
            password: this.password,
            lastname: this.lastname,
            firstname: this.firstname,
            dateNaiss: this.dateNaiss,
            phoneNumber: this.phoneNumber
        })
    }
    async update(update: userUpdateTypes): Promise < any > {
        // updateOne
        const { modifiedCount } = await this.userdb.updateOne(
            { _id: this.id },
            { $set: update }
        );
    }
    delete(): Promise < any > {
        throw new Error('Method not implemented.');
    }
    setRole(role: roleTypes): void {
        this._role = role;
        this.update({role: role})
    }
    getAge(): Number {
        var ageDifMs = Date.now() - this.dateNaiss.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    fullName(): string {
        return `${this.lastname} ${this.firstname}`;
    }
}