import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpseComponent } from './corpse.component';
import { CorpseModule } from './corpse.module';

const routes: Routes = [
  { 
    path: '', component: CorpseComponent 
  },
  {
    path: 'corpse',
    component: CorpseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpseRoutingModule { }
