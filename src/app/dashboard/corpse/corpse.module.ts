import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpseRoutingModule } from './corpse-routing.module';
import { CorpseComponent } from './corpse.component';
import { CorpseListComponent } from './corpse-list/corpse-list.component';
import { CorpseFormComponent } from './corpse-form/corpse-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CorpseForm2Component } from './corpse-form2/corpse-form2.component';
import { CorpseForm2Module } from './corpse-form2/corpse-form2.module';


@NgModule({
  declarations: [
    CorpseComponent,
    CorpseListComponent,
    CorpseFormComponent,
  ],
  imports: [
    CommonModule,
    CorpseRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DataTablesModule,
    CorpseForm2Module,
  ]
})
export class CorpseModule { }
