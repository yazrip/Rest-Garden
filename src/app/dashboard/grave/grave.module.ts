import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraveRoutingModule } from './grave-routing.module';
import { GraveComponent } from './grave.component';
import { GraveFormComponent } from './grave-form/grave-form.component';
import { GraveListComponent } from './grave-list/grave-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";



@NgModule({
  declarations: [
    GraveComponent,
    GraveFormComponent,
    GraveListComponent
  ],
  imports: [
    CommonModule,
    GraveRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class GraveModule { }
