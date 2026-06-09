export interface ProfileResponse {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}