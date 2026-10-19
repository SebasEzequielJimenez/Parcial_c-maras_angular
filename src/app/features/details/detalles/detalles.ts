import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamarasService } from '../../../data-access/camera.service';
import { Camara } from '../../../data-access/camara.model';
import { Formulario} from '../../../features/form/formulario/formulario';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [Formulario],
  templateUrl: './detalles.html',
  styleUrl: './detalles.css'
})
export class Detalles implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(CamarasService);

  camara = signal<Camara | null>(null);
  modoEdicion = signal<boolean>(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getById(id).subscribe({
        next: data => this.camara.set(data),
        error: () => this.router.navigate(['/catalogo'])
      });
    }
  }

  toggleEditar(): void {
    this.modoEdicion.update(v => !v);
  }

  onActualizado(actualizado: Camara): void {
    this.camara.set(actualizado);
    this.modoEdicion.set(false);
  }

  onBorrar(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar esta cámara?')) {
      this.service.delete(id).subscribe(() => this.router.navigate(['/catalogo']));
    }
  }
}