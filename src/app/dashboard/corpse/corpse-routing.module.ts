import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpseComponent } from './corpse.component';

const routes: Routes = [
  { path: '', component: CorpseComponent },
  { path: 'corpse', component: CorpseComponent},
  { path: 'corpse/:id', component: CorpseComponent},
  { path: ':id', component: CorpseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpseRoutingModule { }
