import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./features/auth/components/login/login";
import { ActionsComponent } from "./features/action/actions/action";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, ActionsComponent], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Aura_Pulse-app');
}