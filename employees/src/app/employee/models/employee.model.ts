import { Role } from "./role.model";

export class Employee {
    public id: number;
    public firstName: string;
    public surname: string;
    public identityNumber: string;
    public gender: GENDER;
    public birthDate: Date;
    public status: boolean;
    public startWorking: Date;
    public roles: Role[] = [];
}
export enum GENDER { male, female };