import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../features/users/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private VALID_TOKEN = 'oiajosduiaoisdjiajsodijoasd'


    private _authUser = new BehaviorSubject<User | null>(null)
    authUser = this._authUser.asObservable()
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('token', this.VALID_TOKEN);
    this._authUser.next({
        email: 'FAKE@GMAIL.COM',
        password: '123456',
        role: 'EMPLOYEE'
    })
    this.router.navigate(['dashboard', 'courses']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login'])
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token')

    return of(this.VALID_TOKEN === token)
  }

  // async login() {
  //   // console.log('EJECUTANDO LOGIN REAL');
  //   console.log('START');
  //   await this.obtenerUsuarioPromise()
  //     // Cuando promise se resuelve satisfactoriamente
  //     .then((usuario) => {
  //       console.log('USUARIO', usuario);
  //     })
  //     // Atrapamos el error
  //     .catch((err) => {
  //       alert(err);
  //     })
  //     .finally(() => {});
  //   console.log('END');
  // }

  // login() {
  //   this.obtenerUsuarioObservable().subscribe({
  //     // Se ejecuta cuando el observable emite un valor (sin errores)
  //     next: (usuario) => {
  //       console.log(usuario);
  //     },
  //     // Se ejecuta cuando el observable emite un error
  //     error: (error) => {
  //       console.log('OCURRIO ALGO', error);
  //     },
  //     // Se ejecuta cuando el observable deja de emitir valores
  //     complete: () => {
  //       console.log(
  //         'El observable se completo, por ende no va a emitir mas valores'
  //       );
  //     },
  //   });
  // }

  verificarToken() {}

  obtenerUsuarioAutenticado() {}

  /**
   * Ejercitacion Promesas y Observables
   */

  obtenerUsuarioObservable(): Observable<any> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next({
          name: 'Name fake',
          email: 'fake@mail.com',
        });
        // observer.complete();
        // observer.error('Error desconocido');
      }, 2000);
    });
  }

  obtenerUsuarioPromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Error desconocido');

      setTimeout(() => {
        resolve({
          name: 'Name fake',
          email: 'fake@mail.com',
        });
      }, 2000);
    });
  }
}