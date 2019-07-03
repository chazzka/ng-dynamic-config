import * as fromUser from './user.reducer';
import * as fromRolesWithPrivileges from './roles-with-privileges.reducer';

export const reducers = {
    user: fromUser.userReducer,
    rolesWithPrivileges: fromRolesWithPrivileges.rolesReducer
}