import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  users: Observable<User[]>

  status: boolean = false;

  //load user from redux and save user to redux and edit user with redux here
  constructor(private store: Store<AppState>) { 
    this.users = store.select("user");
  }

  ngOnInit() {
  }

  toggleStatus() {
    this.status = !this.status;
  }

}
