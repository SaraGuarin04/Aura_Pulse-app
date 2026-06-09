import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionDocument } from '../models/action.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private readonly API_URL = 'https://aura-pulse-dz27.onrender.com/api/v2/actions'; 
  private readonly http = inject(HttpClient);

  // GET /actions
  getActions(): Observable<ActionDocument[]> {
    return this.http.get<ActionDocument[]>(this.API_URL);
  }

  // 🔍 NUEVO: GET /actions/{id} (image_2d7c64.png)
  getActionById(id: string): Observable<ActionDocument> {
    return this.http.get<ActionDocument>(`${this.API_URL}/${id}`);
  }

  // 📥 POST /actions (image_2d7d20.png) - Recibe el payload completo con auraPoints
  createAction(action: { title: string; category: string; description: string; value: number; auraPoints: number }): Observable<any> {
    return this.http.post<any>(this.API_URL, action);
  }

  // 📝 PUT /actions/{id} (image_2d7cca.png) - Recibe title, description, status y points
  updateAction(id: string, data: { title: string; description: string; status: string; points: number }): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, data);
  }

  // 🗑️ DELETE /actions/{id}
  deleteAction(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}