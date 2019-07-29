import * as UserActions from './../actions/user.actions'
import { User } from 'src/app/models/user';

export function userReducer(state: Map<string, User>, action: UserActions.Actions) {
	switch (action.type) {
		case UserActions.IMPORT_USER: {
			const oldMap = state;
			let newMap = new Map<string, User>(oldMap);
			let existing = newMap.get(action.payload.userId);
			//pokud už existuje, ale je smazany, tak jen odnastav vlajku
			if(existing && existing.removed) {
				existing.description = action.payload.description;
				existing.removed = false;
				return newMap;			
			} 
			return newMap.set(action.payload.userId, action.payload);
			
		}		
		case UserActions.REMOVE_USER: {
			const oldMap = state;
			let newMap = new Map<string, User>(oldMap);
			let user: User = action.payload;
			
			//nemažeme, jen nastavujeme vlajku
			user.removed = true;			
			newMap.set(action.payload.userId, user)
			return newMap;
		}
		case UserActions.UPDATE_USER: {
			const oldMap = state;
			let newMap = new Map<string, User>(oldMap);						
			let oldUser = oldMap.get(action.payload.oldUserId);

			//vytvoř nového usera pomocí starých a nových atributů
			let newUser: User = {
				dbID: oldUser.dbID,
				description: action.payload.newUser.description,
				fullName: action.payload.newUser.fullName,
				roleNames: action.payload.newUser.roleNames,
				userId: action.payload.newUser.userId
			}

			console.log(newUser);
			
			//dve stejna jmena klidne mohou existovat
			//
			//prepisujeme jen description, nyni dle ID
			if(action.payload.oldUserId === action.payload.newUser.userId) {
				return newMap.set(action.payload.oldUserId, newUser);
			} else {
				newMap.delete(action.payload.oldUserId);
				return newMap.set(action.payload.oldUserId, newUser);
			}
		}
		case UserActions.ROLES_ASSIGN: {
			//najdi usera kteremu chces assignout
			const oldMap = state;
			let newMap = new Map<string, User>(oldMap);
			let user: User = action.payload.user;					
			//prepis mu vsecky role ktere prisly					
			user.roleNames = action.payload.roleNames;									
			return newMap.set(action.payload.user.userId, user);		

		}			
		default:
			return state;
	}
}