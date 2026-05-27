export interface ActionDocument {
  _id?: string;
  userId: string;
  title: string;
  category: 'Reciclaje' | 'Transporte' | 'Energia' | 'Agua' | 'Otro';
  description?: string;
  value: number;
  auraPoints: number;
  createdAT: string;
}