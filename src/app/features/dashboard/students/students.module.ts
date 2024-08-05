import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component'; 
import { SharedModule } from '../../../shared/shared.module';
import { ResaltadoDirective } from '../../../shared/directives/resaltado.directive';
import { StudentsRoutingModule } from './students-routing.module';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent,
    ResaltadoDirective,
  ],
  exports: [StudentsComponent],
  imports: [
    SharedModule,
    CommonModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
