import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent implements OnInit {
  agendamento = {
    servico: '',
    data: '',
    horario: '',
  };

  isUserLoggedIn = false;
  showPopup = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const agendamentoData = localStorage.getItem('agendamento');
    if (agendamentoData) {
      this.agendamento = JSON.parse(agendamentoData);
    }

    const token = localStorage.getItem('token');
    this.isUserLoggedIn = !!token;
  }

  novaReserva(): void {
    this.router.navigate(['/agendar-sl']);
  }

  verReservas(): void {
    this.router.navigate(['/minhas-reservas']);
  }

  fecharPopup(): void {
    this.showPopup = false;
  }
}
