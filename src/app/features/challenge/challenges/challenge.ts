import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeService } from '../services/challenge';
import { Challenge } from '../models/challenge.model';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge.html',
  styleUrl: './challenge.css'
})
export class ChallengeComponent implements OnInit {
  private readonly challengeService = inject(ChallengeService);

  protected readonly challengesList = signal<Challenge[]>([]);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.challengeService.getChallenges().subscribe({
      next: (data) => this.challengesList.set(data),
      error: () => this.errorMessage.set('Error al conectar con el servidor de desafíos.')
    });
  }
}