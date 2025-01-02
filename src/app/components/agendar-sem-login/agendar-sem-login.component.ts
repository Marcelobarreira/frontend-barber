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
