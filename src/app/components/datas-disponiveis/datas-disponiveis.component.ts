import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HorariosService } from '../../services/horarios/horarios.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-datas-disponiveis',
  standalone: true,
  providers: [provideNgxMask()],
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './datas-disponiveis.component.html',
  styleUrl: './datas-disponiveis.component.scss'
})
export class DatasDisponiveisComponent implements OnInit {
  diasSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
  horarios: string[] = [];
  dias: Date[] = [];
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  currentMonthYear: string = '';
  showModal = false;
  nome: string = '';
  telefone: string = '';
  horarioSelecionado: string = '';
  servicoSelecionado: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private horariosService: HorariosService
  ) {}

  ngOnInit(): void {
    // Obtém o serviço do queryParams
    this.route.queryParams.subscribe((params) => {
      this.servicoSelecionado = params['servico'] || '';
    });

    this.updateCalendar();
  }

  updateCalendar(): void {
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    const dates: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      dates.push(day);
    }

    this.dias = dates;
    this.currentMonthYear = this.formatMonthYear(this.currentDate);
    this.fetchHorarios();
  }

  fetchHorarios(): void {
    this.horariosService.getHorariosDisponiveis().subscribe((res) => {
      const dataMap = new Map<string, string[]>(res.map((d: any) => [d.data, d.horarios]));
      this.horarios = [];

      this.dias.forEach((date) => {
        const dateString = date.toISOString().split('T')[0];
        if (this.selectedDate?.toISOString().split('T')[0] === dateString && dataMap.has(dateString)) {
          this.horarios = dataMap.get(dateString) || [];
        }
      });
    });
  }

  confirmarAgendamento(): void {
    // Validação do nome
    if (!this.nome.trim() || this.nome.split(' ').length < 2) {
      alert('Por favor, insira seu nome completo (Nome e Sobrenome).');
      return;
    }

    this.loading = true;

    const telefoneSemMascara = this.telefone.replace(/\D/g, '');
    if (telefoneSemMascara.length !== 11) {
      alert('Por favor, insira um número de telefone válido com DDD.');
      return;
    }

    if (!this.selectedDate || !this.horarioSelecionado || !this.servicoSelecionado) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const data = this.selectedDate.toISOString().split('T')[0];
    const agendamento = {
      data,
      horario: this.horarioSelecionado,
      servico: this.servicoSelecionado,
      usuario: this.nome.trim(),
      telefone: telefoneSemMascara,
    };

    this.horariosService.marcarHorario(agendamento).subscribe(
      () => {
        this.loading = false;
        localStorage.setItem('agendamento', JSON.stringify(agendamento));
        this.closeModal();
        this.router.navigate(['/confirmacao']);
      },
      (error) => {
        this.loading = false;
        console.error('Erro ao marcar horário:', error);
        alert('Erro ao marcar horário.');
      }
    );
  }


  selectHorario(horario: string): void {
    this.horarioSelecionado = horario;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.nome = '';
    this.telefone = '';
    this.horarioSelecionado = '';
  }

  goToPreviousWeek(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.updateCalendar();
  }

  goToNextWeek(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.updateCalendar();
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  formatMonthYear(date: Date): string {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  goBack(): void {
    this.router.navigate(['/agendar-sem-login']);
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.fetchHorarios();
  }
}
