import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-roles-assign',
  templateUrl: './user-roles-assign.component.html',
  styleUrls: ['./user-roles-assign.component.css']
})
export class UserRolesAssignComponent implements OnInit {

  users: Observable<User[]>;
  rolesWithPrivilege: Observable<RolesWithPrivilege[]>;

  constructor(private store: Store<AppState>) {
    this.rolesWithPrivilege = this.store.select("rolesWithPrivilege");
    this.users = this.store.select("user");
   }

  ngOnInit() {
  }

}
