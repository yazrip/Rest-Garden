import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserForm2Component } from './user-form2/user-form2.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'user', component: UserComponent},
  { path: 'user/:id', component: UserForm2Component},
  { path: ':id', component: UserForm2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
