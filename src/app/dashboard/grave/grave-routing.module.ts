import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraveFormComponent } from './grave-form/grave-form.component';
import { GraveComponent } from './grave.component';

const routes: Routes = [
  { path: '', component: GraveComponent },
  { path: 'grave', component: GraveComponent},
  { path: 'grave/:id', component: GraveComponent },
  { path: ':id', component: GraveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraveRoutingModule { }
