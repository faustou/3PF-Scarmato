import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  nombreEntorno = environment.envName
  constructor(private authService: AuthService) {
  }
  logout() {
    this.authService.logout()
  }
}
