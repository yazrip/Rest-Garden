import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpseRoutingModule } from './corpse-routing.module';
import { CorpseComponent } from './corpse.component';
import { CorpseListComponent } from './corpse-list/corpse-list.component';
import { CorpseFormComponent } from './corpse-form/corpse-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CorpseMenuComponent } from './corpse-menu/corpse-menu.component';



@NgModule({
  declarations: [
    CorpseComponent,
    CorpseListComponent,
    CorpseFormComponent,
    CorpseMenuComponent
  ],
  imports: [
    CommonModule,
    CorpseRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class CorpseModule { }
