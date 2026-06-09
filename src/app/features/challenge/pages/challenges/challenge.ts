import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { ChallengeService } from '../../services/challenge';
import { Challenge } from '../../models/challenge.model';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './challenge.html',
  styleUrl: './challenge.css'
})
export class ChallengeComponent implements OnInit {
  private readonly challengeService = inject(ChallengeService);

  protected readonly challengesList = signal<Challenge[]>([]);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.challengeService.getChallenges().subscribe({
      next: (data) => this.challengesList.set(data),
      error: () => this.errorMessage.set('Error al conectar con el servidor de desafíos.')
    });
  }

  protected createChallenge(name: string, description: string, pointsReward: number, difficulty: string): void {
    if (!name.trim() || !description.trim() || isNaN(pointsReward) || !difficulty.trim()) {
      this.errorMessage.set('Todos los campos son obligatorios para crear el reto.');
      return;
    }

    const typedDifficulty = difficulty as 'Easy' | 'Medium' | 'Hard';

    const newChallenge: Partial<Challenge> = { 
      name, 
      description, 
      pointsReward, 
      difficulty: typedDifficulty
    };

    this.challengeService.postChallenge(newChallenge).subscribe({
      next: () => {
        this.errorMessage.set(null);
        this.loadInitialData();
        alert('¡Desafío guardado exitosamente en el servidor!');
      },
      error: () => this.errorMessage.set('Error en el servidor al intentar registrar el desafío.')
    });
  }

  protected editChallenge(id: string, title: string, description: string, points: number, difficulty: string): void {
    if (!id.trim() || !title.trim() || !description.trim() || isNaN(points) || !difficulty.trim()) {
      this.errorMessage.set('Todos los campos son requeridos para actualizar el desafío.');
      return;
    }

    const updatedData = { 
      title: title.trim(), 
      description: description.trim(), 
      points: points, 
      difficulty: difficulty.toLowerCase() 
    };

    this.challengeService.updateChallenge(id, updatedData).subscribe({
      next: () => {
        this.errorMessage.set(null);
        this.loadInitialData(); 
        alert('¡Desafío actualizado con éxito!');
      },
      error: () => this.errorMessage.set('Error al intentar actualizar el desafío en el servidor.')
    });
  }

  protected removeChallenge(id: string): void {
    if (!id.trim()) {
      this.errorMessage.set('Por favor, ingresa el ID del desafío que deseas eliminar.');
      return;
    }
    
    if (confirm('¿Estás completamente segura de que deseas dar de baja este desafío ecológico?')) {
      this.challengeService.deleteChallenge(id).subscribe({
        next: () => {
          this.errorMessage.set(null);
          this.loadInitialData(); 
          alert('Desafío eliminado correctamente.');
        },
        error: () => this.errorMessage.set('Error al intentar eliminar el desafío.')
      });
    }
  }
}