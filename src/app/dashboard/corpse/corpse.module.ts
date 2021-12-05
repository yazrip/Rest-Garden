import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpseRoutingModule } from './corpse-routing.module';
import { CorpseComponent } from './corpse.component';



@NgModule({
  declarations: [
    CorpseComponent,
  ],
  imports: [
    CommonModule,
    CorpseRoutingModule
  ]
})
export class CorpseModule { }
