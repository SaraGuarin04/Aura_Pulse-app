import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from "../../services/auth";
import { LoginRequest } from '../../models/auth';
import { emailError } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Session } from '../../../../shared/services/session';

@Component({
  selector: 'login',
  imports: [FormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private _AuthService = inject(AuthService);
   private _sessionService = inject(Session);
  private router = inject(Router);

  user = '';
  password = '';

   public error = 'error';

  sendLogin() {

    const body: LoginRequest = {
      email: this.user,
      password: this.password
    }
    this._AuthService.login(body).subscribe({
      next: (res)=>{
        this._sessionService.setToken(res.token);
        this.router.navigate(['/dashboard'])
      },
      error:(err)=>{
        this.error = err.error.message
        console.log(this.error);
      },
    })
  }

}