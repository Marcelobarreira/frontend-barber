import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendar-sem-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendar-sem-login.component.html',
  styleUrls: ['./agendar-sem-login.component.scss'],
})
export class AgendarSemLoginComponent {
  showModalReservas: boolean = false;
  reserva: any = null;

  constructor(private router: Router) {}

  servicos = [
    {
      nome: 'CORTE',
      duracao: '30min',
      preco: 'R$ 30,00',
      imagem: 'assets/corte-cabelo.jpg',
    },
    {
      nome: 'BARBA',
      duracao: '20min',
      preco: 'R$ 20,00',
      imagem: 'assets/barba.png',
    },
    {
      nome: 'CORTE + BARBA',
      duracao: '50min',
      preco: 'R$ 45,00',
      imagem: 'assets/platinado.png',
    },
    {
      nome: 'CORTE + SOBRANCELHA',
      duracao: '40min',
      preco: 'R$ 40,00',
      imagem: 'assets/corte-cabelo.jpg',
    },
  ];

  irHome(): void {
    this.router.navigate(['/bem-vindo']);
  }

  abrirModalReservas(): void {
    const agendamentoData = localStorage.getItem('agendamento');
    this.reserva = agendamentoData ? JSON.parse(agendamentoData) : null;
    this.showModalReservas = true;
  }

  fecharModalReservas(): void {
    this.showModalReservas = false;
  }

  fecharModalFora(event: MouseEvent): void {
    this.showModalReservas = false;
  }

  agendarServico(servico: string): void {
    this.router.navigate(['/datas-disponiveis'], { queryParams: { servico } });
  }
  formatarTelefone(telefone: string): string {
    const regex = /(\d{2})(\d{5})(\d{4})/;
    const match = telefone.match(regex);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return telefone;
  }
}
