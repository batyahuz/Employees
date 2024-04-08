import { RoleName } from "./role.name.model";

export class Role {
    public id: number;
    public nameId: number;
    public name: RoleName;
    public isManagerial: boolean = false;
    public startRole: Date;
}