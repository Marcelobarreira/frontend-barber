import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendar-sem-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendar-sem-login.component.html',
  styleUrl: './agendar-sem-login.component.scss'
})
export class AgendarSemLoginComponent {
  isUserLoggedIn: boolean = false;

  constructor(private Router: Router) {}
  servicos = [
    {
      nome: 'CORTE',
      duracao: '30min',
      preco: 'R$ 30,00',
    },
    {
      nome: 'BARBA',
      duracao: '20min',
      preco: 'R$ 20,00',
    },
    {
      nome: 'CORTE + BARBA',
      duracao: '50min',
      preco: 'R$ 45,00',
    },
    {
      nome: 'CORTE + BARBA + SOBRANCELHA',
      duracao: '1h:00min',
      preco: 'R$ 60,00',
    },
    {
      nome: 'CORTE + SOBRANCELHA',
      duracao: '40min',
      preco: 'R$ 40,00',
    },
  ];

  ngOnInit(): void {}

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    this.isUserLoggedIn = !!token;
  }

  navigateToMinhasReservas(): void {
    this.Router.navigate(['/minhas-reservas']);
  }

  agendarServico(servico: string): void {
    this.Router.navigate(['/datas-disponiveis'], { queryParams: { servico } });
  }

}
