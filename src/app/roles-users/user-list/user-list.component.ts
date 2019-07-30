import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { Observable, Subject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import * as UserActions from '../../ngrx/actions/user.actions';
import { UserService } from 'src/app/services/user.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {

  @ViewChild('userNameInput', { static: false }) userNameInput: ElementRef;
  @ViewChild('userDescriptionInput', { static: false }) userDescriptionInput: ElementRef;

  //users$: Observable<Map<string, User>>;

  status: boolean = false;

  selectedUser: User;

  userIndex: number;


  //DATATABLE
  dtOptions: DataTables.Settings = {
    "paging": false,
    retrieve: true,
    scrollY: "600",
    info: false
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  data: any[];
  dtTrigger: Subject<any> = new Subject();

  users$: Subscription;

  constructor(private store: Store<AppState>, private userService: UserService) {
  }

  ngOnInit() {
    this.loadData();    
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();

  }

  loadData() {
    this.users$ = this.store.select("users").subscribe((user: Map<string, User>) => {
      if (user !== undefined) {
        this.data = Array.from(user.values())
        this.rerender();
        this.dtTrigger.next();
      }
    })
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
    this.rerender();

  }

  onDeleteClick() {
    if (this.selectedUser) {
      this.store.dispatch(new UserActions.RemoveUser(this.selectedUser));
      this.resetTable();
      this.rerender();
    }
    //TODO: MUSI TO TU BYT?
    this.userService.notifyUserAdded();
    //this.users$ = this.store.select("users");
  }

  onUpdateClick(userUpdateName: string, userUpdateDescription: string) {
    this.store.dispatch(new UserActions.UpdateUser({ oldUserId: this.selectedUser.userId, newUser: { dbID: this.selectedUser.dbID, fullName: userUpdateName, description: userUpdateDescription, userId: this.selectedUser.userId, roleNames: this.selectedUser.roleNames } }));
    this.resetTable();
    this.rerender();
  }

  resetTable() {
    this.selectedUser = null;
    this.userNameInput.nativeElement.value = "";
    this.userDescriptionInput.nativeElement.value = "";
    this.userIndex = null;
  }

  rerender(): void {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }
  }

}
