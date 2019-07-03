import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { HttpService } from './services/HttpService';
import { Store } from '@ngrx/store';
import { AppState } from './ngrx/app.state';
import * as UserActions from './ngrx/actions/user.actions';
import { RolesWithPrivilege } from './models/RolesWithPrivilege';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-dynamic-config';

  users$: User[];
  roles$: RolesWithPrivilege[];

  constructor(public _httpService: HttpService, private store: Store<AppState>) {
  }
  ngOnInit() {
    this.getUsersHttpToRedux();
    this.getCompletePrivileges();
  }

  //for testing purposes
  getCompletePrivileges() {
    this._httpService.getCompletePrivileges()
      .subscribe((data) => {
        console.log(data);
      });
  }

  getUsersHttpToRedux() {
    this._httpService.getCompletePrivileges()
      .subscribe(
        (data: User[]) => {
          this.users$ = data["users"];
        },
        () => {
          console.log("error loading users");
        },
        () => {
          this.users$.forEach((user: User) => this.store.dispatch(new UserActions.AddUser(user)));
        }
      );
  }

}
