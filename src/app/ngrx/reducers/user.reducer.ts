import * as UserActions from './../actions/user.actions'
import { User } from 'src/app/models/user';

const initialState: User = {
    dbID: null,
    description: null,
    fullName: null,
    roleNames: null,
    userId: null
}

export function userReducer(state: User[] = [/*inital state*/], action: UserActions.Actions) {
	switch (action.type) {
		case UserActions.ADD_USER:
			return [...state, action.payload];
		case UserActions.REMOVE_USER:
			state.splice(action.payload, 1)
			return state;
		default:
			return state;
	}
}