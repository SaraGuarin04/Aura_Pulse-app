import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from "../../services/auth";
import { Router } from '@angular/router';
import { Session } from '../../../../shared/services/session';

@Component({
  selector: 'login',
  standalone: true, 
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private _AuthService = inject(AuthService);
  private _sessionService = inject(Session);
  private router = inject(Router);

  isLoginMode = true;
  user = '';      
  password = '';
  name = '';       
  public error = '';

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = ''; 
  }

  handleSubmit() {
    if (this.isLoginMode) {
      this._AuthService.login({ email: this.user, password: this.password }).subscribe({
        next: (res) => {
          this._sessionService.setToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => { this.error = err.error.message || 'Error en login'; }
      });
    } else {
      this._AuthService.register({ name: this.name, email: this.user, password: this.password }).subscribe({
        next: () => {
          alert('Registro exitoso. Ya puedes iniciar sesión.');
          this.isLoginMode = true; // Volver al login
        },
        error: (err) => { this.error = err.error.message || 'Error en registro'; }
      });
    }
  }
}