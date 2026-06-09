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

  getActions(): Observable<ActionDocument[]> {
    return this.http.get<ActionDocument[]>(this.API_URL);
  }

  getActionById(id: string): Observable<ActionDocument> {
    return this.http.get<ActionDocument>(`${this.API_URL}/${id}`);
  }

  createAction(action: { title: string; category: string; description: string; value: number }): Observable<any> {
    return this.http.post<any>(this.API_URL, action);
  }

  updateAction(id: string, data: { title: string; description: string; status: string; points: number }): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, data);
  }


  deleteAction(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}