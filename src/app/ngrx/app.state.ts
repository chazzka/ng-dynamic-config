import { User } from '../models/user';
import { RolesWithPrivilege } from '../models/RolesWithPrivilege';

export interface AppState {
    readonly user: User[];
    readonly rolesWithPrivilege: Map<string,RolesWithPrivilege>;
}