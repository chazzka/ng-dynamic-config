import { RolesWithPrivilege } from './RolesWithPrivilege';
import { User } from './user';

export interface InputModel {
    appName:             string;
    rolesToRemove:       number[];
    rolesWithPrivileges: RolesWithPrivilege[];
    users:               User[];
    usersToRemove:       number[];
}
