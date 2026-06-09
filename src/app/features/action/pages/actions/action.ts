import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActionService } from '../../services/action';
import { ActionDocument } from '../../models/action.model';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink], 
  templateUrl: './action.html', 
  styleUrls: ['./action.css']
})
export class ActionsComponent implements OnInit {
  private readonly actionService = inject(ActionService);

  protected readonly actionsList = signal<ActionDocument[]>([]);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadActions();
  }

  private loadActions(): void {
    this.actionService.getActions().subscribe({
      next: (data) => this.actionsList.set(data),
      error: () => this.errorMessage.set('Error al sincronizar datos.')
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