import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserForm2RoutingModule } from './user-form2-routing.module';
import { UserForm2Component } from './user-form2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserForm2Component
  ],
  imports: [
    CommonModule,
    UserForm2RoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserForm2Module { }
