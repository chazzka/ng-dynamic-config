import { Action } from '@ngrx/store';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';

export const ADD_ROLE = '[ROLESWITHPRIVILEGE] Add'
export const REMOVE_ROLE = '[ROLESWITHPRIVILEGE] Remove'
export const UPDATE_ROLE = '[ROLESWITHPRIVILEGE] Update'

export class AddRole implements Action {
    readonly type = ADD_ROLE;

    constructor(public payload: RolesWithPrivilege) {
    }
}

export class RemoveRole implements Action {
    readonly type = REMOVE_ROLE;

    constructor(public payload: RolesWithPrivilege) {
    }
}

export class UpdateRole implements Action {
    readonly type = UPDATE_ROLE;

    constructor(public payload: { oldRoleName: string, newRole: RolesWithPrivilege }) {
    }
}

export type Actions = AddRole | RemoveRole | UpdateRole;