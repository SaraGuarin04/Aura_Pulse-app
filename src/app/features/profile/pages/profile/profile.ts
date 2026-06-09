import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ProfileService } from '../../services/profile';
import { ProfileResponse } from '../../models/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);

  // Signals para el estado
  protected readonly profile = signal<ProfileResponse | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  // Variables para el binding del formulario (para que el HTML las reconozca)
  protected currentPassword = '';
  protected newPassword = '';

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data: any) => this.profile.set(data as ProfileResponse),
      error: () => this.errorMessage.set('Error al cargar datos del perfil.')
    });
  }

  protected updatePassword(): void {
    if (!this.currentPassword || !this.newPassword) {
      this.errorMessage.set('Ambos campos de contraseña son obligatorios.');
      return;
    }

    const payload = { 
      currentPassword: this.currentPassword, 
      newPassword: this.newPassword 
    }; 
  
    this.profileService.updatePassword(payload).subscribe({
      next: () => {
        alert('¡Contraseña actualizada con éxito!');
        this.currentPassword = ''; // Limpiar campos
        this.newPassword = '';
        this.errorMessage.set(null);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Error al actualizar la contraseña. Verifica tu clave actual.');
      }
    });
  }

  protected navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  protected deleteAccount(): void {
    if (confirm('¿Estás segura de que deseas eliminar tu cuenta permanentemente?')) {
      this.profileService.deleteAccount().subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        error: () => this.errorMessage.set('Error al intentar eliminar la cuenta.')
      });
    }
  }
}