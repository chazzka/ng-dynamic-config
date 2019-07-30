import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { Observable, Subscription, Subject } from 'rxjs';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';
import * as RolesWithPrivilegesActions from '../../ngrx/actions/roles-with-privileges.actions'
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.css']
})
export class RoleEditorComponent implements OnInit, AfterViewInit {

  @ViewChild('roleNameInput', { static: false }) roleNameInput: ElementRef;
  @ViewChild('roleDescriptionInput', { static: false }) roleDescriptionInput: ElementRef;

  rolesWithPrivilegeSub$: Subscription;
  toggler: boolean = false;


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
  
  roles$: Subscription;

  selectedRole: RolesWithPrivilege;
  roleIndex: number;

  constructor(private store: Store<AppState>, private h: HttpClient) {
  }

  ngOnInit() {
    this.loadData();    
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  loadData() {
     this.roles$ = this.store.select("rolesWithPrivilege").subscribe((role: Map<string, RolesWithPrivilege>) => {
      if (role !== undefined) {

        this.data = Array.from(role.values())        
        this.rerender();
        this.dtTrigger.next();
      }
    })

  }

  toggleStatus() {
    this.toggler = !this.toggler;
  }

  selectRow(role: RolesWithPrivilege, index: number) {
    this.roleIndex = index;
    this.selectedRole = role;
    if (role.name)
      this.roleNameInput.nativeElement.value = role.name;
    if (role.description) {
      this.roleDescriptionInput.nativeElement.value = role.description;
    } else {
      this.roleDescriptionInput.nativeElement.value = "";
    }

  }

  onAddClick(roleAddName: string, roleAddDescription: string) {

    let role: RolesWithPrivilege = {
      dbID: null,
      name: roleAddName,
      description: roleAddDescription,
      rolePrivileges: [],
    }
    this.store.dispatch(new RolesWithPrivilegesActions.AddRole(role));
    this.rerender();
  }

  onDeleteClick() {
    if (this.selectedRole) {
      this.store.dispatch(new RolesWithPrivilegesActions.RemoveRole(this.selectedRole));
      this.resetTable();
      this.rerender();
    }

    //this.rolesWithPrivilegeSub$ = this.store.select("rolesWithPrivilege");  
  }

  onUpdateClick(roleUpdateName: string, roleUpdateDescription: string) {
    this.store.dispatch(new RolesWithPrivilegesActions.UpdateRole({ oldRoleName: this.selectedRole.name, newRole: { dbID: null, name: roleUpdateName, description: roleUpdateDescription, rolePrivileges: [] } }));
    this.resetTable();
    this.rerender();
  }

  resetTable() {
    this.selectedRole = null;
    this.roleNameInput.nativeElement.value = "";
    this.roleDescriptionInput.nativeElement.value = "";
    this.roleIndex = null;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.roles$.unsubscribe();

  }

  rerender(): void {
    if(this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }
    
  }

}
