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
  protected readonly searchedAchievement = signal<Achievement | null>(null); // 🔥 Para guardar el logro buscado
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
      this.errorMessage.set('Por favor, ingresa un ID válido.');
      return;
    }

    this.achievementsService.getAchievementById(id).subscribe({
      next: (data) => {
        this.searchedAchievement.set(data);
        this.errorMessage.set(null);
      },
      error: () => {
        this.searchedAchievement.set(null);
        this.errorMessage.set('No se encontró ningún logro con ese ID.');
      }
    });
  }

  protected editAchievement(id: string, name: string, description: string): void {
    if (!id.trim() || !name.trim() || !description.trim()) {
      this.errorMessage.set('Todos los campos son obligatorios para actualizar.');
      return;
    }

    const updatedData = { name, description };
    this.achievementsService.updateAchievement(id, updatedData).subscribe({
      next: () => {
        this.errorMessage.set(null);
        this.loadInitialData(); // 🔥 Recarga la lista principal automáticamente
        this.searchedAchievement.set(null);
        alert('¡Logro actualizado con éxito!');
      },
      error: () => this.errorMessage.set('Error al intentar actualizar el logro.')
    });
  }

  protected removeAchievement(id: string): void {
    if (!id.trim()) {
      this.errorMessage.set('Por favor, ingresa el ID del logro que deseas eliminar.');
      return;
    }
    
    if (confirm('¿Estás completamente segura de que deseas eliminar este logro de forma permanente?')) {
      this.achievementsService.deleteAchievement(id).subscribe({
        next: () => {
          this.errorMessage.set(null);
          this.loadInitialData(); 
          this.searchedAchievement.set(null);
          alert('Logro eliminado correctamente.');
        },
        error: () => this.errorMessage.set('Error al intentar eliminar el logro.')
      });
    }
  }
}