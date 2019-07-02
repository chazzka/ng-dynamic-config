import { RolePrivilege } from './RolePrivilege';

export interface RolesWithPrivilege {
    dbID: number;
    description: string;
    name: string;
    rolePrivileges: RolePrivilege[];
}