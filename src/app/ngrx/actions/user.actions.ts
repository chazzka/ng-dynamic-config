import { Action } from '@ngrx/store'
import { User } from 'src/app/models/user';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';

export const IMPORT_USER = '[USER] Import'
export const REMOVE_USER = '[USER] Remove'
export const UPDATE_USER = '[USER] Update'
export const ROLES_ASSIGN = '[USER] Roles_assign'

export class ImportUser implements Action {
    readonly type = IMPORT_USER;

    constructor(public payload: User) {
    }
}

export class RemoveUser implements Action {
    readonly type = REMOVE_USER;

    constructor(public payload: User) {
    }
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;

    constructor(public payload: { oldUserId: number, newUser: User }) {
    }
}

export class RolesAssign implements Action {
    readonly type = ROLES_ASSIGN;

    constructor(public payload: { user: User, roleNames: string[] }) {
    }
}

export type Actions = ImportUser | RemoveUser | UpdateUser | RolesAssign