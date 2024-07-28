import { Component, Inject } from '@angular/core';
import { AuthMockService } from '../../../core/services/auth-mock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  loginForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  constructor(
    private authService: AuthMockService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
    //@Inject(APP_CONFIG) private appConfig: any
  ) {
    //console.log('appConfig', appConfig);
    this.loginForm = this.fb.group({
      email: ['test@mail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      role: ['ADMIN', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('El formulario no es valido');
    } else {
      this.authService.login();
      this.snackBar.open('Se creo un alumno nuevo', 'Close', { duration: 5000, horizontalPosition: this.horizontalPosition, });
    }
  }
}
