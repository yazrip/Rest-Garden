import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpseForm2RoutingModule } from './corpse-form2-routing.module';
import { CorpseForm2Component } from './corpse-form2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CorpseForm2Component
  ],
  imports: [
    CommonModule,
    CorpseForm2RoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CorpseForm2Module { }
