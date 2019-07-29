import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/app.state';
import { HttpService } from '../services/HttpService';
import { combineLatest, Subscription, forkJoin, Observable } from 'rxjs';
import { User } from '../models/user';
import { InputModel } from '../models/InputModel';
import { applicationNames } from 'src/environments/environment';
import { RolePrivilege } from '../models/RolePrivilege';
import { RolesWithPrivilege } from '../models/RolesWithPrivilege';
import { ToastrService } from 'ngx-toastr';
import { take, map, combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  completed: boolean = true;
  getSub: Subscription;
  postSub: Subscription;


  constructor(public ngxSmartModalService: NgxSmartModalService, private store: Store<AppState>, private _httpService: HttpService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  cancelClicked() {
    this.ngxSmartModalService.getModal("myModal").open();
  }

  reload() {
    location.reload();
  }

  save() {
    //TODO: TEST if save works properly
    let completePrivileges: InputModel;

    let users$:Observable<Map<string, User>> = this.store.select("users");
    let rolesWithPrivilege$: Observable<Map<string, RolesWithPrivilege>> = this.store.select("rolesWithPrivilege");
    
    users$.subscribe((users) => {
      rolesWithPrivilege$.subscribe((roles) => {
        let usersToPost = Array.from(users.values()).map((user: User) => { return { dbID: user.dbID, description: user.description, fullName: user.fullName, roleNames: user.roleNames, userId: user.userId } });
        let rolesToPost = Array.from(roles.values()).map((role: RolesWithPrivilege) => { return { dbID: role.dbID, description: role.description, name: role.name, rolePrivileges: role.rolePrivileges } });
        
        completePrivileges = {
          appName: applicationNames.mapper,
          rolesToRemove: [],
          rolesWithPrivileges: rolesToPost,
          users: usersToPost,
          usersToRemove: []
        };

        users.forEach((value: User, key: string) => {
          if (value.removed) {
            completePrivileges.usersToRemove.push(value.dbID);
          }
        });

        roles.forEach((value: RolesWithPrivilege, key: string) => {
          if (value.removed) {
            completePrivileges.rolesToRemove.push(value.dbID);
          }
        });

        this.afterSave(completePrivileges);

      }).unsubscribe();    
    }).unsubscribe();
    
  }

  private afterSave(completePrivileges) {
    console.log("complete privileges before post:");    
    console.log(completePrivileges);

    this.completed = false;
    this.postSub = this._httpService.postCompletePrivileges(completePrivileges)
      .subscribe(
        () => {
          this.toastr.success("Changes were persisted", "Success");          
        },
        response => {
          this.toastr.error("Changes are not persisted - technical info in a console", "Error");
          console.log(response);
        },
        () => {
          //complete         
          this.completed = true;

        }
      )

  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.postSub.unsubscribe();
  }

}
