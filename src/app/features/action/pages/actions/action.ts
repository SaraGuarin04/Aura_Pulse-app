import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ActionService } from '../../services/action';
import { ActionDocument } from '../../models/action.model';

type ActionCategory = 'Reciclaje' | 'Transporte' | 'Energia' | 'Agua' | 'Otro';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, FormsModule], 
  templateUrl: './action.html', 
  styleUrls: ['./action.css']
})
export class ActionsComponent implements OnInit {
  private readonly actionService = inject(ActionService);
  
  protected readonly actionsList = signal<ActionDocument[]>([]);
  protected readonly errorMessage = signal<string | null>(null);
  protected newAction: { title: string; category: ActionCategory | ''; description: string; value: number} = { 
    title: '', category: '', description: '', value: 0
  };

  ngOnInit(): void {
    this.loadActions();
  }

  private loadActions(): void {
    this.actionService.getActions().subscribe({
      next: (data) => this.actionsList.set(data),
      error: () => this.errorMessage.set('Error al sincronizar datos.')
    });
  }

  protected createAction(): void {
    if (!this.newAction.category) {
      alert('Por favor, selecciona una categoría.');
      return;
    }
    this.actionService.createAction(this.newAction).subscribe({
      next: () => {
        alert('¡Acción registrada con éxito!');
        this.loadActions(); 
        this.newAction = { title: '', category: '', description: '', value: 0 }; 
      },
      error: () => alert('Error al crear la acción.')
    });
  }

  protected findActionById(id: string): void {
    if (!id.trim()) {
      alert('Por favor, ingresa un ID.');
      return;
    }

    this.actionService.getActionById(id.trim()).subscribe({
      next: (action) => {
        const mensaje = `
          ✨ Registro Encontrado:
          Título: ${action.title}
          Categoría: ${action.category}
          Puntos Aura: ${action.auraPoints}
          Descripción: ${action.description || 'Sin descripción'}
        `;
        alert(mensaje);
      },
      error: () => {
        alert('Error: No se encontró ninguna acción con ese ID.');
      }
    });
  }

  protected editAction(id: string, title: string, description: string, points: number): void {
    const updatedPayload = { 
      title: title.trim(), 
      description: description.trim(), 
      status: 'pendiente', 
      points: points 
    };
    
    this.actionService.updateAction(id.trim(), updatedPayload).subscribe({
      next: () => {
        this.loadActions();
        alert('¡Acción actualizada con éxito!');
      },
      error: () => this.errorMessage.set('Error al actualizar.')
    });
  }

  protected removeAction(id: string): void {
    if (!id.trim()) return;
    if (confirm('¿Eliminar registro?')) {
      this.actionService.deleteAction(id.trim()).subscribe({
        next: () => this.loadActions(),
        error: () => alert('Error al eliminar.')
      });
    }
  }
}