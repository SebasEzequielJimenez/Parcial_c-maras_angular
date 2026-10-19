import { Routes } from '@angular/router';
import { Catalogo } from './features/catalog/catalogo/catalogo';
import { Formulario } from './features/form/formulario/formulario';
import { Detalles } from './features/details/detalles/detalles';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: Catalogo },
  { path: 'agregar', component: Formulario },
  { path: 'detalles/:id', component: Detalles },
  { path: '**', redirectTo: 'catalogo' }
];