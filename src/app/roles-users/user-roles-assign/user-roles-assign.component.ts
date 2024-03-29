import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { User } from 'src/app/models/user';
import * as UserActions from '../../ngrx/actions/user.actions';
import _ from 'lodash';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-roles-assign',
  templateUrl: './user-roles-assign.component.html',
  styleUrls: ['./user-roles-assign.component.css']
})
export class UserRolesAssignComponent implements OnInit, OnDestroy {

  users$: Observable<Map<string, User>>;
  rolesWithPrivilege$: Observable<Map<string, RolesWithPrivilege>>;
  selectedUserID: string;
  selectedUser: User;
  rolesCheckboxes: {} = {};
  usersSubscription: Subscription;
  userChangeSubscription: Subscription;

  constructor(private store: Store<AppState>, private userService: UserService) {
    this.rolesWithPrivilege$ = this.store.select("rolesWithPrivilege");
    this.users$ = this.store.select("users");
  }

  ngOnInit() {
    //if user was deleted, clear selection to prevent confusion
    this.userChangeSubscription = this.userService.userChanged.subscribe(() => {
      this.selectedUserID = null;
    })
  }

  userChanged(selectedUserDbID) {
    //on user change, clear all property changes (they are saved in storage)
    this.rolesCheckboxes = {};

    //find this user

    this.usersSubscription = this.store.select("users").subscribe((map: Map<string, User>) => {
      let user: User = map.get(this.selectedUserID);
      this.selectedUser = user;
      if (user.roleNames) {
        user.roleNames.forEach(role => {
          this.rolesCheckboxes[role] = true;
        });
      }
    })


  }

  checkboxChanged(event, role: RolesWithPrivilege) {

    this.rolesCheckboxes[role.name] = event.target.checked;
    const checkedRoles = _.keys(_.pickBy(this.rolesCheckboxes));

    this.store.dispatch(new UserActions.RolesAssign({ user: this.selectedUser, roleNames: checkedRoles }));
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    if (this.userChangeSubscription) {
      this.userChangeSubscription.unsubscribe();
    }

  }

}
