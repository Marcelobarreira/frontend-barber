import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent {
  agendamento = {
    servico: '',
    data: '',
    horario: '',
  };

  isUserLoggedIn = false;

  constructor(private router: Router) {
    const agendamentoData = localStorage.getItem('agendamento');
    if (agendamentoData) {
      this.agendamento = JSON.parse(agendamentoData);
    }

    const token = localStorage.getItem('token');
    this.isUserLoggedIn = !!token;
  }

  novaReserva(): void {
    this.router.navigate(['/agendar-sem-login']);
  }

  verReservas(): void {
    this.router.navigate(['/minhas-reservas']);
  }
}
