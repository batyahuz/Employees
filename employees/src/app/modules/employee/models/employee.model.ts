import { Role } from "./role.model";

export class Employee {
    public id: number;
    public firstName: string;
    public lastName: string;
    public identityNumber: string;
    public gender: GENDER;
    public birthDate: Date;
    public startWorking: Date;
    public roles: Role[] = [];
}
export enum GENDER { male, female };