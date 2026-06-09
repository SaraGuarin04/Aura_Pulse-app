import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UpdatePasswordRequest } from '../models/profile';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://aura-pulse-dz27.onrender.com/api/v2';

  getProfile() {
    return this.http.get(`${this.API_URL}/auth/profile`);
  }

  updatePassword(data: UpdatePasswordRequest) {
    return this.http.put(`${this.API_URL}/auth/update-password`, data);
}

  deleteAccount() {
    return this.http.delete(`${this.API_URL}/auth/delete-account`);
  }
}