import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpseForm2Component } from './corpse-form2.component';

const routes: Routes = [
  { path: '', component: CorpseForm2Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpseForm2RoutingModule { }
