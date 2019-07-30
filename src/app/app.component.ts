import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { User } from './models/user';
import { HttpService } from './services/HttpService';
import { Store } from '@ngrx/store';
import { AppState } from './ngrx/app.state';
import * as UserActions from './ngrx/actions/user.actions';
import * as RolesWithPrivilegesAction from './ngrx/actions/roles-with-privileges.actions'
import { RolesWithPrivilege } from './models/RolesWithPrivilege';
import { Subscription, forkJoin, Observable, combineLatest } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-dynamic-config';

  users: User[];
  roles: RolesWithPrivilege[];

  usersSubscription$: Subscription;
  completeSubscription$: Subscription;
  rolesSubscription$: Subscription;

  
  
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  }
  

  constructor(private _httpService: HttpService, private store: Store<AppState>, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getUsersHttpToRedux();
    //TODO: testing
    //this.getCompletePrivileges();
    this.getRolesHttpToRedux();


  }

  //for testing purposes
  getCompletePrivileges() {
    this.completeSubscription$ = this._httpService.getCompletePrivileges()
      .subscribe((data) => {        
        console.log(data);
      });
  }

  getUsersHttpToRedux() {
    this.usersSubscription$ = this._httpService.getCompletePrivileges()
      .subscribe(        
        (data: User[]) => {
          
          this.users = data["users"];
        },
        () => {
          this.toastr.error("Could not load users", "Error");
        },
        () => {
          this.users.forEach((user: User) => this.store.dispatch(new UserActions.ImportUser(user)));
        }
      );
  }

  getRolesHttpToRedux() {
    this.rolesSubscription$ = this._httpService.getCompletePrivileges()
      .subscribe(
        (data: RolesWithPrivilege[]) => {
          this.roles = data["rolesWithPrivileges"];
        },
        () => {
          this.toastr.error("Could not load roles", "Error");
        },
        () => {
          this.roles.forEach((role: RolesWithPrivilege) => this.store.dispatch(new RolesWithPrivilegesAction.AddRole(role)));
        }
      )
  }

  ngOnDestroy() {
    this.usersSubscription$.unsubscribe();
    this.completeSubscription$.unsubscribe();
    this.rolesSubscription$.unsubscribe();
  }

}
