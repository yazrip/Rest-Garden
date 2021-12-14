import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpseForm2Component } from './corpse-form2/corpse-form2.component';
import { CorpseComponent } from './corpse.component';

const routes: Routes = [
  { path: '', component: CorpseComponent },
  { path: 'corpse', component: CorpseComponent},
  { path: 'corpse/:id', component: CorpseForm2Component},
  { path: ':id', component: CorpseForm2Component},
  { path: '', loadChildren: () => import('./corpse-form2/corpse-form2.module').then(m => m.CorpseForm2Module) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpseRoutingModule { }
