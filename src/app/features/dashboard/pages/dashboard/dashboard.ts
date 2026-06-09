import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  private readonly router = inject(Router);

  navigateTo(route: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }
}