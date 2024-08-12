import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El campo Email debe ser requerido', () => {
    const emailControl = component.loginForm.get('email')

    emailControl?.setValue('')

    expect(emailControl?.invalid).toBeTrue()
  })

  it('Al llamar onSubmit, si el form es invalido, debe mostrar un alert', () => {
    const loginForm = component.loginForm
    loginForm.setValue({
      email: '',
      password: '',
      role: ''
    })
    const spyOnAlert = spyOn(window, 'alert')
    component.onSubmit()
    expect(spyOnAlert).toHaveBeenCalled()
  })

  it('Al llamar a onSubmit, si el formulario es valido, debe llamar a authService.login', () => {
    const loginForm = component.loginForm
    loginForm.setValue({
      email: 'fake@mail.com',
      password: '12345',
      role: 'ADMIN'
    })

    const spyOnLogin = spyOn((component as any).authService, 'login')

    component.onSubmit()
    expect(spyOnLogin).toHaveBeenCalled()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
