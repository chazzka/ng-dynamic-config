import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { Observable } from 'rxjs';
import { RolesWithPrivilege } from 'src/app/models/RolesWithPrivilege';
import * as RolesWithPrivilegesActions from '../../ngrx/actions/roles-with-privileges.actions'

@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.css']
})
export class RoleEditorComponent implements OnInit {

  @ViewChild('roleNameInput', { static: false }) roleNameInput: ElementRef;
  @ViewChild('roleDescriptionInput', { static: false }) roleDescriptionInput: ElementRef;

  rolesWithPrivilege$: Observable<Map<string, RolesWithPrivilege>>;

  toggler: boolean = false;

  selectedRole: RolesWithPrivilege;

  roleIndex: number;

  constructor(private store: Store<AppState>) {
    
  }

  ngOnInit() {
    this.rolesWithPrivilege$ = this.store.select("rolesWithPrivilege");
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
  }

  onDeleteClick() {
    if (this.selectedRole) {
      this.store.dispatch(new RolesWithPrivilegesActions.RemoveRole(this.selectedRole));
      this.resetTable();
    }
    this.rolesWithPrivilege$ = this.store.select("rolesWithPrivilege");  
  }

  onUpdateClick(roleUpdateName: string, roleUpdateDescription: string) {
    this.store.dispatch(new RolesWithPrivilegesActions.UpdateRole({ oldRoleName: this.selectedRole.name, newRole: { dbID: null, name: roleUpdateName, description: roleUpdateDescription, rolePrivileges: [] } }));
    this.resetTable();
  }

  resetTable() {
    this.selectedRole = null;
    this.roleNameInput.nativeElement.value = "";
    this.roleDescriptionInput.nativeElement.value = "";
    this.roleIndex = null;
  }


}
