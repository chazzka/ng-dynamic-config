import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import * as UserActions from '../../ngrx/actions/user.actions';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('userNameInput', { static: false }) userNameInput: ElementRef;
  @ViewChild('userDescriptionInput', { static: false }) userDescriptionInput: ElementRef;

  users$: Observable<Map<string, User>>;

  status: boolean = false;

  selectedUser: User;

  userIndex: number;

  constructor(private store: Store<AppState>, private userService: UserService) {
    this.users$ = store.select("users");
  }

  ngOnInit() {
  }

  toggleStatus() {
    this.status = !this.status;
  }

  selectRow(user: User, index: number) {
    this.userIndex = index;
    this.selectedUser = user;
    if (user.fullName) {
      this.userNameInput.nativeElement.value = user.fullName;
    } else {
      this.userNameInput.nativeElement.value = "";
    }
      
    if (user.description) {
      this.userDescriptionInput.nativeElement.value = user.description;
    } else {
      this.userDescriptionInput.nativeElement.value = "";
    }
  }

  onAddClick(userAddAD: string, userAddDescription: string) {
    //TODO: GET USER BY HIS AD NUMBER, klasik http request
    //pokud tam bude, Importni ho s jeho ID

    let user: User = {
      dbID: null,
      description: userAddDescription,
      fullName: "",
      roleNames: [],
      userId: userAddAD.toLocaleUpperCase(),      
    }
    
    //jinak se zeptej jestli chce a pokud ano (vyuzij modal) tak ho importni s UserID = toUpper(fullname)
    //this.store.dispatch(new UserActions.ImportUser({ dbID: null, description: userAddDescription, fullName: "", roleNames: [], userId: userAddAD.toLocaleUpperCase() }));
    this.store.dispatch(new UserActions.ImportUser(user));
    this.selectedUser = user;
    
  }

  onDeleteClick() {
    if (this.selectedUser) {

      this.store.dispatch(new UserActions.RemoveUser(this.selectedUser));
      this.resetTable();
    }
    this.userService.notifyUserAdded();
    this.users$ = this.store.select("users");        
  }

  onUpdateClick(userUpdateName: string, userUpdateDescription: string) {
    this.store.dispatch(new UserActions.UpdateUser({ oldUserId: this.selectedUser.userId, newUser: { dbID: this.selectedUser.dbID, fullName: userUpdateName, description: userUpdateDescription, userId: this.selectedUser.userId, roleNames: this.selectedUser.roleNames } }));
    this.resetTable();
  }

  resetTable() {
    this.selectedUser = null;
    this.userNameInput.nativeElement.value = "";
    this.userDescriptionInput.nativeElement.value = "";
    this.userIndex = null;
  }

}
