export interface Challenge {
  _id?: string;            
  name: string;            
  description: string;    
  pointsReward: number;    
  difficulty: 'Easy' | 'Medium' | 'Hard'; 
  createdAt: string;       
}