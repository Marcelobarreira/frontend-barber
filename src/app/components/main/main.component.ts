import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorariosService } from '../../services/horarios/horarios.service';

import { CommonModule } from '@angular/common';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { HeaderComponent } from "../header/header.component";
import { FaturamentoHojeComponent } from './components/faturamento-hoje/faturamento-hoje.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgendamentosComponent, FaturamentoHojeComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  agendamentos: any[] = [];

  constructor(private router: Router, private horariosService: HorariosService) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    this.horariosService.listarAgendamentos().subscribe(
      (response) => {
        this.agendamentos = response.agendamentos || [];
      },
      (error) => {
        console.error('Erro ao carregar agendamentos:', error);
      }
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
