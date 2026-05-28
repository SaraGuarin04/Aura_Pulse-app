import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AchievementsService } from '../services/achievements';
import { Achievement } from '../models/achiements.model';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './achievements.html',
  styleUrl: './achievements.css'
})
export class AchievementsComponent implements OnInit {
  private readonly achievementsService = inject(AchievementsService);
  
  protected readonly achievementsList = signal<Achievement[]>([]);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.achievementsService.getAchievements().subscribe({
      next: (data) => this.achievementsList.set(data),
      error: () => this.errorMessage.set('Error al conectar con el servidor para traer tus logros.')
    });
  }
}