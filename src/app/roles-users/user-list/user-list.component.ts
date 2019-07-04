import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import * as UserActions from '../../ngrx/actions/user.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('userNameInput', { static: false }) userNameInput: ElementRef;
  @ViewChild('userDescriptionInput', { static: false }) userDescriptionInput: ElementRef;

  users$: Observable<User[]>

  status: boolean = false;

  selectedUser: User;

  userIndex: number;

  constructor(private store: Store<AppState>) {
    this.users$ = store.select("user");
  }

  ngOnInit() {
  }

  toggleStatus() {
    this.status = !this.status;
  }

  selectRow(user: User, index: number) {
    this.userIndex = index;
    this.selectedUser = user;
    if (user.fullName)
      this.userNameInput.nativeElement.value = user.fullName;
    if (user.description) {
      this.userDescriptionInput.nativeElement.value = user.description;
    } else {
      this.userDescriptionInput.nativeElement.value = "";
    }
  }

  onDeleteClick() {
    if (this.selectedUser) {
      this.store.dispatch(new UserActions.RemoveUser(this.userIndex));
    }
  }

  onAddClick(userAddAD: string, userAddDescription: string) {
    //GET USER BY HIS AD NUMBER


    //THEN dispatch
    this.store.dispatch(new UserActions.AddUser({ dbID: null, description: userAddDescription, fullName: "", roleNames: [], userId: userAddAD }));
  }

}
