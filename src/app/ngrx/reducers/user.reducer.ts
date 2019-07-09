import * as UserActions from './../actions/user.actions'
import { User } from 'src/app/models/user';

const initialState: User = {
    dbID: null,
    description: null,
    fullName: null,
    roleNames: null,
    userId: null
}

export function userReducer(state: Map<number, User>, action: UserActions.Actions) {
	switch (action.type) {
		case UserActions.IMPORT_USER: {
			const oldMap = state;
			let newMap = new Map<number, User>(oldMap);
			return newMap.set(action.payload.dbID, action.payload);
		}		
		case UserActions.REMOVE_USER: {
			const oldMap = state;
			let newMap = new Map<number, User>(oldMap);
			newMap.delete(action.payload.dbID);
			return newMap;
		}
		case UserActions.UPDATE_USER: {
			const oldMap = state;
			let newMap = new Map<number, User>(oldMap);	
			//dve stejna jmena klidne mohou existovat
			//
			//prepisujeme jen description, nyni dle ID
			if(action.payload.oldUserId === action.payload.newUser.dbID) {
				return newMap.set(action.payload.oldUserId, action.payload.newUser);
			} else {
				newMap.delete(action.payload.oldUserId);
				return newMap.set(action.payload.oldUserId, action.payload.newUser);
			}
		}
		case UserActions.ROLES_ASSIGN: {
			//najdi usera kteremu chces assignout
			const oldMap = state;
			let newMap = new Map<number, User>(oldMap);
			let user: User = action.payload.user;					
			//prepis mu vsecky role ktere prisly					
			user.roleNames = action.payload.roleNames;									
			return newMap.set(action.payload.user.dbID, user);		

		}			
		default:
			return state;
	}
}