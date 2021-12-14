import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '../shared/guard/guard.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', canActivate:[RouteGuard], component: DashboardComponent },
  { path: 'grave', canActivate:[RouteGuard], loadChildren: () => import('./grave/grave.module').then(m => m.GraveModule) }, 
  { path: 'menu', canActivate:[RouteGuard], loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: 'transaction', canActivate:[RouteGuard], loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule) },
  { path: 'reservation', canActivate:[RouteGuard], loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule) },
  { path: 'corpse', canActivate:[RouteGuard], loadChildren: () => import('./corpse/corpse.module').then(m => m.CorpseModule) },
  { path: 'corpse-form2', canActivate:[RouteGuard], loadChildren: () => import('./corpse/corpse-form2/corpse-form2.module').then(m => m.CorpseForm2Module) },
  { path: 'user', canActivate:[RouteGuard], loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'form', loadChildren: () => import('./grave/form/form.module').then(m => m.FormModule) },
  { path: 'user-form2', loadChildren: () => import('./user/user-form2/user-form2.module').then(m => m.UserForm2Module) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
