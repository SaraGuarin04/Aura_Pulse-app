import { Component, OnInit, inject } from '@angular/core';
import { ActionService } from '../services/action';
import { ActionDocument } from '../models/action.model';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [CommonModule, DatePipe], 
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  public actionsList: ActionDocument[] = [];
  
  private actionService = inject(ActionService);

  ngOnInit(): void {
    this.loadActions();
  }

  loadActions(): void {
    this.actionService.getActions().subscribe({
      next: (data) => {
        this.actionsList = data;
      },
      error: (err) => {
        console.error('Error al cargar las acciones ecológicas:', err);
      }
    });
  }
}