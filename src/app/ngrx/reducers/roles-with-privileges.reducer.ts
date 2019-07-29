import * as RolesWithPrivilegesActions from '../actions/roles-with-privileges.actions';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';
import { ToastrService } from 'ngx-toastr';


export function rolesReducer(state: Map<string, RolesWithPrivilege>, action: RolesWithPrivilegesActions.Actions) {

    switch (action.type) {
        case RolesWithPrivilegesActions.ADD_ROLE: {
            const oldMap = state;
            let newMap = new Map<string, RolesWithPrivilege>(oldMap);         
           let existing = newMap.get(action.payload.name);
           //pokud už existuje, ale je smazany, tak jen odnastav vlajku
           if(existing && existing.removed) {
               existing.description = action.payload.description;
               existing.removed = false;
               return newMap;			
           } 
           return newMap.set(action.payload.name, action.payload);

        }
        case RolesWithPrivilegesActions.REMOVE_ROLE: {
            const oldMap = state;
            let newMap = new Map<string, RolesWithPrivilege>(oldMap);
            let role: RolesWithPrivilege = action.payload;
            //nemazat, jen nastavit vlajku
            role.removed = true;
            newMap.set(action.payload.name, role);
            return newMap;
        }
        case RolesWithPrivilegesActions.UPDATE_ROLE: {        
            const oldMap = state;
            let newMap = new Map<string, RolesWithPrivilege>(oldMap);
            let tempMap = new Map<string, RolesWithPrivilege>(oldMap);
            
            let oldRole = oldMap.get(action.payload.oldRoleName);
            let newRole = action.payload.newRole;

            //zachovej jejich hodnoty, které nejdou upravovat ve formulari update role            
            newRole.dbID = oldRole.dbID;
            newRole.rolePrivileges = oldRole.rolePrivileges;

            tempMap.delete(action.payload.oldRoleName);
            //jmeno uz existuje?
            if(tempMap.has(action.payload.newRole.name)) {
                alert("This role already exists");
            } else if(action.payload.oldRoleName === action.payload.newRole.name) {
                //přepisujeme pouze description
                return newMap.set(action.payload.oldRoleName, newRole);
            } else {
                //přepisujeme jméno = nový klíč
                newMap.delete(action.payload.oldRoleName);
                return newMap.set(action.payload.newRole.name,newRole);
            }            
        }
        default: {
            return state;
        }
    }
}