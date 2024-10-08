import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from '../../../app-routing.module';
import { SharedModule } from '../../../shared/shared.module';




@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
