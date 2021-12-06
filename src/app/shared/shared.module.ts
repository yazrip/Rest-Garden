import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ValidationMessageComponent } from './validation-message/validation-message.component';



@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    ValidationMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    ValidationMessageComponent
  ]
})
export class SharedModule { }
