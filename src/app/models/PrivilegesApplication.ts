import { User } from './user';
import { RolesWithPrivilege } from './RolesWithPrivilege';

export interface PrivilegesApplication {
    appName: string;
    rolesWithPrivileges: RolesWithPrivilege[];
    users: User[];
}
