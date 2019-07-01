import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivilegesComponent } from './privileges/privileges.component';
import { RolesUsersComponent } from './roles-users/roles-users.component';

const routes: Routes = [
  { path: '', redirectTo: '/roles-users', pathMatch: 'full' },
  { path: 'roles-users', component: RolesUsersComponent },
  { path: 'privileges', component: PrivilegesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
