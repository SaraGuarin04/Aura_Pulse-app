import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // 🔥 1. IMPORTAMOS ROUTERLINK PARA LOS SUBBOTONES
import { ChallengeService } from '../../services/challenge';
import { Challenge } from '../../models/challenge.model';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule, RouterLink], // 🔥 2. REGISTRAMOS ROUTERLINK AQUÍ
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

  protected findChallenge(id: string): void {
    if (!id.trim()) {
      alert('Por favor, ingresa un ID válido de desafío.');
      return;
    }
    alert(`Pidiendo al servidor los detalles específicos del reto con ID: ${id}`);
  }

  protected editChallenge(id: string, title: string, points: number): void {
    if (!id.trim() || !title.trim() || isNaN(points)) {
      alert('Todos los campos (ID, Nuevo título y Nuevos puntos) son requeridos para actualizar.');
      return;
    }
    alert(`Enviando cambios del desafío ID: ${id} al backend mediante PUT\nNuevo Título: ${title}\nPuntos Actualizados: ${points}`);

  }

  protected removeChallenge(id: string): void {
    if (!id.trim()) {
      alert('Por favor, ingresa el ID del desafío que deseas eliminar.');
      return;
    }
    
    if (confirm('¿Estás completamente segura de que deseas dar de baja este desafío ecológico?')) {
      alert(`Enviando orden de eliminación al servidor para el ID: ${id}`);

    }
  }
}