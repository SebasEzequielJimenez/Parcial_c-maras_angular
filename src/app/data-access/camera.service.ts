import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camara } from './camara.model';

@Injectable({ providedIn: 'root' })
export class CamarasService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/cameras';

  getAll(): Observable<Camara[]> {
    return this.http.get<Camara[]>(this.apiUrl);
  }

  getById(id: string): Observable<Camara> {
    return this.http.get<Camara>(`${this.apiUrl}/${id}`);
  }

create(camara: Omit<Camara, 'id'>): Observable<Camara> {
  return this.http.post<Camara>(this.apiUrl, camara);
}
  update(id: string, camara: Partial<Camara>): Observable<Camara> {
    return this.http.put<Camara>(`${this.apiUrl}/${id}`, camara);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}