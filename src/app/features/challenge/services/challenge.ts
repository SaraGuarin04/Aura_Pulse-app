import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challenge } from '../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://aura-pulse-dz27.onrender.com/api/v2/challenges'; 

  getChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.apiUrl);
  }


  postChallenge(data: Partial<Challenge>): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateChallenge(
    id: string, 
    data: { title: string; description: string; points: number; difficulty: string }
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }


  deleteChallenge(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}