import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('roleNameInput', {static: false}) roleNameInput: ElementRef;
  @ViewChild('roleDescriptionInput', {static: false}) roleDescriptionInput: ElementRef;

  rolesWithPrivilege: Observable<RolesWithPrivilege[]>

  toggler: boolean = false;

  selectedRole: RolesWithPrivilege;

  roleIndex:number;

  constructor(private store: Store<AppState>) { 
    this.rolesWithPrivilege = this.store.select("rolesWithPrivilege");
  }

  ngOnInit() {
  }

  toggleStatus() {
    this.toggler = !this.toggler;
  }

  selectRow(role: RolesWithPrivilege, index:number) {
    this.roleIndex = index;
    this.selectedRole = role;
    if(role.name)
      this.roleNameInput.nativeElement.value = role.name;
    if(role.description) {
      this.roleDescriptionInput.nativeElement.value = role.description;
    } else {
      this.roleDescriptionInput.nativeElement.value = "";
    }
      
  }

  onDeleteClick() {
    if(this.selectedRole) {
      this.store.dispatch(new RolesWithPrivilegesActions.RemoveRole(this.roleIndex));
    }   
  }

  onAddClick(roleAddName: string, roleAddDescription: string) {

    //check if role name exists
  
    //then dispatch
    this.store.dispatch(new RolesWithPrivilegesActions.AddRole({dbID: null, name: roleAddName, description: roleAddDescription, rolePrivileges: []}));
  }
  

}
