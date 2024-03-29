import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    userChanged = new Subject<any>();

    notifyUserAdded() {
        this.userChanged.next();
    }

}