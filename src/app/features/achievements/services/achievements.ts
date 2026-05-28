import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Achievement } from '../models/achiements.model';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://aura-pulse-dz27.onrender.com/api/v2/achievements'; 

  getAchievements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(this.apiUrl);
  }
}

