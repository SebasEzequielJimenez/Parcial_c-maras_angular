import { Component, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CamarasService } from '../../../data-access/camera.service';
import { Camara, CamaraTipo } from '../../../data-access/camara.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(CamarasService);
  private readonly router = inject(Router);

  camaraEditar = input<Camara | undefined>();
  guardado = output<Camara>();

  tipos: CamaraTipo[] = ['Mirrorless', 'DSLR', 'Compacta'];

form = this.fb.group({
  modelo: ['', Validators.required],
  tipo: ['' as CamaraTipo, Validators.required],
  resolucion: [0, [Validators.required, Validators.min(12), Validators.max(99)]],
  stock: [0, [Validators.required, Validators.min(0)]],
  descripcion: ['', [Validators.maxLength(200)]],
  enOferta: [false]
});
  constructor() {
    effect(() => {
      const c = this.camaraEditar();
      if (c) {
        this.form.patchValue({
          modelo: c.modelo,
          tipo: c.tipo,
          resolucion: c.resolucion,
          stock: c.stock,
          descripcion: c.descripcion || '',
          enOferta: c.enOferta
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as Omit<Camara, 'id'>;
    const actual = this.camaraEditar();

    if (actual?.id) {
  this.service.update(actual.id, payload).subscribe(updated => {
    this.guardado.emit(updated);
  });
} else {
  this.service.create(payload).subscribe(() => {
    this.router.navigate(['/catalogo']);
  });
} }
  onReset(): void {
    this.form.reset();
  }
}

