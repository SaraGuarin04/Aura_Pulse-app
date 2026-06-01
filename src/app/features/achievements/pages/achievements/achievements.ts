import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { AchievementsService } from '../../services/achievements';
import { Achievement } from '../../models/achiements.model';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink], 
  templateUrl: './achievements.html',
  styleUrl: './achievements.css' 
})
export class AchievementsComponent implements OnInit {
  private readonly achievementsService = inject(AchievementsService);
  
  protected readonly achievementsList = signal<Achievement[]>([]);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.achievementsService.getAchievements().subscribe({
      next: (data) => this.achievementsList.set(data),
      error: () => this.errorMessage.set('Error al conectar con el servidor para traer tus logros.')
    });
  }

  protected findAchievement(id: string): void {
    if (!id.trim()) {
      alert('Por favor, ingresa un ID válido.');
      return;
    }
    alert(`Buscando de forma específica el logro con ID: ${id} en el servidor...`);
  }

  protected editAchievement(id: string, name: string, description: string): void {
    if (!id.trim() || !name.trim() || !description.trim()) {
      alert('Todos los campos (ID, Nuevo nombre y Nueva descripción) son obligatorios.');
      return;
    }
    alert(`Enviando actualización (PUT) para el logro con ID: ${id}\nNuevo Nombre: ${name}\nNueva Descripción: ${description}`);
  }

  protected removeAchievement(id: string): void {
    if (!id.trim()) {
      alert('Por favor, ingresa el ID del logro que deseas eliminar.');
      return;
    }
    
    if (confirm('¿Estás completamente segura de que deseas eliminar este logro de forma permanente?')) {
      alert(`Enviando petición de borrado (DELETE) al servidor para el ID: ${id}`);
    }
  }
}