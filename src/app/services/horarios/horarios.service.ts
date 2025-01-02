import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl, environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  constructor(private http: HttpClient) {}

  getHorariosDisponiveis(): Observable<any> {
    return this.http.get(`${baseurl}${environment.horarios}`);
  }

  marcarHorario(data: { data: string; horario: string; servico: string; usuario: string }): Observable<any> {
    return this.http.post(`${baseurl}${environment.marcar}`, data);
  }

  listarAgendamentos(): Observable<any> {
    return this.http.get(`${baseurl}${environment.listar}`);
  }
}
