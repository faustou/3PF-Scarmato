import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from '../../../shared/shared.module';
import { ResaltadoDirective } from '../../../shared/directives/resaltado.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';



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
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    MatSnackBarModule
  ]
})
export class StudentsModule { }
