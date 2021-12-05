import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpseRoutingModule } from './corpse-routing.module';
import { CorpseComponent } from './corpse.component';
import { CorpseFormComponent } from './corpse-form/corpse-form.component';
import { CorpseListComponent } from './corpse-list/corpse-list.component';


@NgModule({
  declarations: [
    CorpseComponent,
    CorpseFormComponent,
    CorpseListComponent
  ],
  imports: [
    CommonModule,
    CorpseRoutingModule
  ]
})
export class CorpseModule { }
