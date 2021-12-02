import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraveRoutingModule } from './grave-routing.module';
import { GraveComponent } from './grave.component';
import { GraveFormComponent } from './grave-form/grave-form.component';
import { GraveListComponent } from './grave-list/grave-list.component';


@NgModule({
  declarations: [
    GraveComponent,
    GraveFormComponent,
    GraveListComponent
  ],
  imports: [
    CommonModule,
    GraveRoutingModule
  ]
})
export class GraveModule { }
