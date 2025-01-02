import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss'],
})
export class AgendamentosComponent implements OnChanges {
  @Input() agendamentos: any[] = [];
  clientesHoje: number = 0;
  clientesHojeLista: any[] = [];
  showModalHoje: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agendamentos'] && this.agendamentos.length > 0) {
      this.filtrarClientesHoje();
    }
  }

  filtrarClientesHoje(): void {
    const hoje = new Date();
    const hojeFormatado = hoje.toISOString().split('T')[0];

    this.clientesHojeLista = this.agendamentos.filter((agendamento) => {
      const dataAgendamento = new Date(agendamento.data).toISOString().split('T')[0];
      return dataAgendamento === hojeFormatado;
    });

    this.clientesHoje = this.clientesHojeLista.length;
  }


  abrirModalHoje(): void {
    this.showModalHoje = true;
  }

  fecharModalHoje(): void {
    this.showModalHoje = false;
  }
}
