import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from "../../services/auth";
import { LoginRequest } from '../../models/auth';
import { emailError } from '@angular/forms/signals';

@Component({
  selector: 'login',
  imports: [FormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private _AuthService = inject(AuthService);

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
        console.log(res)
      },
      error:(err)=>{
        this.error = err.error.message
        console.log(this.error);
      },
    })
  }

}