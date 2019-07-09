import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { User } from 'src/app/models/user';
import * as UserActions from '../../ngrx/actions/user.actions';
import _ from 'lodash';

@Component({
  selector: 'app-user-roles-assign',
  templateUrl: './user-roles-assign.component.html',
  styleUrls: ['./user-roles-assign.component.css']
})
export class UserRolesAssignComponent implements OnInit, OnDestroy {

  users$: Observable<Map<number, User>>;
  rolesWithPrivilege$: Observable<Map<string, RolesWithPrivilege>>;
  selectedUserID: number;
  selectedUser: User;
  rolesCheckboxes: {} = {};
  usersSubscription: Subscription;
  
  constructor(private store: Store<AppState>) {
    this.rolesWithPrivilege$ = this.store.select("rolesWithPrivilege");
    this.users$ = this.store.select("user");
  }

  ngOnInit() {
  }

  userChanged(selectedUserDbID) {
    //on user change, clear all property changes (they are saved in storage)
    this.rolesCheckboxes = {};
    
    //find this user

    this.usersSubscription = this.store.select("user").subscribe((map: Map<number, User>) => {
      let user: User = map.get(Number(this.selectedUserID));
      this.selectedUser = user;
      if(user.roleNames) {
        user.roleNames.forEach(role => {
          this.rolesCheckboxes[role] = true;
        });
      } 
    })
    
    
  }

  checkboxChanged(event, role: RolesWithPrivilege) {
    
    this.rolesCheckboxes[role.name] = event.target.checked;
   // console.log(Object.keys(this.checkedRoles));
    //console.log(this.selectedUser);
    const checkedRoles = _.keys(_.pickBy(this.rolesCheckboxes));

    this.store.dispatch(new UserActions.RolesAssign({ user: this.selectedUser, roleNames: checkedRoles }));
  }

  ngOnDestroy() {
    if(this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    
  }

}
