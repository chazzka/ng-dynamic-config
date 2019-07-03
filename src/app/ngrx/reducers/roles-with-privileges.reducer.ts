import * as RolesWithPrivilegesActions from '../actions/roles-with-privileges.actions';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';

const initialState: RolesWithPrivilege = {
    dbID: null,
    description: null,
    name: null,
    rolePrivileges: []
}

export function rolesReducer(state: RolesWithPrivilege[] = [/*initial state*/], action: RolesWithPrivilegesActions.Actions) {
    
    switch (action.type) {
        case RolesWithPrivilegesActions.ADD_ROLE: {
            return [...state, action.payload];
        }
        case RolesWithPrivilegesActions.REMOVE_ROLE: {
            state.splice(action.payload, 1)
            return state;
        }
        default: {
            return state;
        }
    }
}