import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Achievement } from '../models/achiements.model';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://aura-pulse-dz27.onrender.com/api/v2/achievements/my'; 

  getAchievements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(this.apiUrl);
  }

  getAchievementById(id: string): Observable<Achievement> {
    return this.http.get<Achievement>(`${this.apiUrl}/${id}`);
  }

  updateAchievement(id: string, data: { name: string, description: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteAchievement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

