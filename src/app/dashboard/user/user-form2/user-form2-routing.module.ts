import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserForm2Component } from './user-form2.component';

const routes: Routes = [
  { path: '', component: UserForm2Component },
  { path: 'user-form2', component: UserForm2Component},
  { path: ':id', component: UserForm2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserForm2RoutingModule { }
