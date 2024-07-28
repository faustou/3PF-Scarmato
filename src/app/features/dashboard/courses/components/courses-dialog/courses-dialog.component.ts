import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Courses } from '../../models';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrl: './courses-dialog.component.scss'
})
export class CoursesDialogComponent {
  alumnoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private matDialogRef: MatDialogRef<CoursesDialogComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public editingCourses?: Courses) {
    this.alumnoForm = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        this.minLengthValidator(3)
      ]],
      lastName: [null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        this.minLengthValidator(3)
      ]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });

    if (this.editingCourses) {
      this.alumnoForm.patchValue(this.editingCourses);
    }
  }
  minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.trim().length < minLength) {
        return { 'minlength': { requiredLength: minLength, actualLength: control.value.trim().length } };
      }
      return null;
    };
  }

  get nameControl(): AbstractControl {
    return this.alumnoForm.get('name')!;
  }

  get lastNameControl(): AbstractControl {
    return this.alumnoForm.get('lastName')!;
  }

  onSubmit(): void {
    if (this.alumnoForm.valid) {
      this.matDialogRef.close(this.alumnoForm.value);
      this.snackBar.open('Formulario enviado correctamente', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('El formulario es inválido', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
