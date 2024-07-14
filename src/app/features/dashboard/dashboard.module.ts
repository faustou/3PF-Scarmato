import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { StudentsModule } from './students/students.module';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [ DashboardComponent ],
  imports: [
    StudentsModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ]
})
export class DashboardModule { 
 }
