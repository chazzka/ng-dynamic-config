import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RolesUsersComponent } from './roles-users/roles-users.component';
import { PrivilegesComponent } from './privileges/privileges.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserListComponent } from './roles-users/user-list/user-list.component';
import { RoleEditorComponent } from './roles-users/role-editor/role-editor.component';
import { UserRolesAssignComponent } from './roles-users/user-roles-assign/user-roles-assign.component';
import { VersionSelectComponent } from './privileges/version-select/version-select.component';
import { RoleSelectComponent } from './privileges/role-select/role-select.component';
import { OperationalPrivilegesComponent } from './privileges/operational-privileges/operational-privileges.component';
import { CompleteLevelsComponent } from './privileges/complete-levels/complete-levels.component';
import { SpecificItemsComponent } from './privileges/specific-items/specific-items.component';
import { TreeviewModule } from 'ngx-treeview';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './ngrx/reducers/user.reducer';
import { rolesReducer } from './ngrx/reducers/roles-with-privileges.reducer';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { FormsModule }   from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [
    AppComponent,
    RolesUsersComponent,
    PrivilegesComponent,
    NavigationComponent,
    UserListComponent,
    RoleEditorComponent,
    UserRolesAssignComponent,
    VersionSelectComponent,
    RoleSelectComponent,
    OperationalPrivilegesComponent,
    CompleteLevelsComponent,
    SpecificItemsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    TreeviewModule.forRoot(),
    HttpClientModule,
    DataTablesModule,
    NgxSmartModalModule.forRoot(),
    StoreModule.forRoot({
      users: userReducer,
      rolesWithPrivilege: rolesReducer
    }),    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
