import * as RolesWithPrivilegesActions from '../actions/roles-with-privileges.actions';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';

const initialState: RolesWithPrivilege = {
    dbID: null,
    description: null,
    name: null,
    rolePrivileges: []
}

export function rolesReducer(state: Map<string, RolesWithPrivilege>, action: RolesWithPrivilegesActions.Actions) {

    switch (action.type) {
        case RolesWithPrivilegesActions.ADD_ROLE: {
            const oldMap = state;
            let newMap = new Map<string, RolesWithPrivilege>(oldMap);
            if (!newMap.has(action.payload.name)) {
                newMap = newMap.set(action.payload.name, action.payload);
            } else {
                //TODO: Toast
                alert("already exists toast");
            }
            return newMap;
        }
        case RolesWithPrivilegesActions.REMOVE_ROLE: {
            const oldMap = state;
            let newMap = new Map<string, RolesWithPrivilege>(oldMap);
            newMap.delete(action.payload.name);
            return newMap;
        }
        case RolesWithPrivilegesActions.UPDATE_ROLE: {        
            const oldMap = state;
            let newMap = new Map<string, RolesWithPrivilege>(oldMap);
            let tempMap = new Map<string, RolesWithPrivilege>(oldMap);
            
            tempMap.delete(action.payload.oldRoleName);
            //jmeno uz existuje?
            if(tempMap.has(action.payload.newRole.name)) {
                //TODO: toast
                alert("already exists");
            } else if(action.payload.oldRoleName === action.payload.newRole.name) {
                //přepisujeme pouze description
                return newMap.set(action.payload.oldRoleName, action.payload.newRole);
            } else {
                //přepisujeme jméno = nový klíč
                newMap.delete(action.payload.oldRoleName);
                return newMap.set(action.payload.newRole.name,action.payload.newRole);
            }            
        }
        default: {
            return state;
        }
    }
}