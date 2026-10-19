import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CamarasService } from '../../../data-access/camera.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {
  private readonly service = inject(CamarasService);
  private readonly router = inject(Router);

  camaras = toSignal(this.service.getAll(), { initialValue: [] });
  filtroActivo = signal<string>('Todas');

  listaFiltrada = computed(() => {
    const seleccion = this.filtroActivo();
    const lista = this.camaras();

    let resultado = lista;
    if (seleccion !== 'Todas') {
      resultado = lista.filter(c => c.tipo === seleccion);
    }

    return [...resultado].sort((a, b) => a.modelo.localeCompare(b.modelo));
  });

  setFiltro(tipo: string): void {
    this.filtroActivo.set(tipo);
  }

  verMas(id: string): void {
    this.router.navigate(['/detalles', id]);
  }
}
