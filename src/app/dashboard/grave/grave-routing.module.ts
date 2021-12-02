import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraveComponent } from './grave.component';

const routes: Routes = [
  { path: '', component: GraveComponent },
  { path: 'grave', component: GraveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraveRoutingModule { }
