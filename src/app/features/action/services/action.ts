import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionDocument } from '../models/action.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private API_URL = 'https://aura-pulse-dz27.onrender.com/api/v2/auth/login'; 
  
  private http = inject(HttpClient);

  getActions(): Observable<ActionDocument[]> {
    return this.http.get<ActionDocument[]>(this.API_URL);
  }

  createAction(action: Omit<ActionDocument, '_id' | 'auraPoints' | 'createdAT' | 'userId'>): Observable<ActionDocument> {
    return this.http.post<ActionDocument>(this.API_URL, action);
  }
}