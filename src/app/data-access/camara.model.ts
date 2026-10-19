// Tipos estrictos para el selector de opciones
export type CamaraTipo = 'Mirrorless' | 'DSLR' | 'Compacta';

// Interfaz que coincide exactamente con la estructura de db.json
export interface Camara {
  id?: string;          // Opcional (?) porque al crear un registro nuevo aún no tiene ID
  modelo: string;       // Requerido
  tipo: CamaraTipo;     // Requerido (Mirrorless | DSLR | Compacta)
  resolucion: number;   // Requerido (12 a 99 Mpx)
  stock: number;        // Requerido (>= 0)
  descripcion?: string; // Opcional (máximo 200 caracteres)
  enOferta: boolean;    // Indicador de promoción (checkbox)
}