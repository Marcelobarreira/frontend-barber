import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-faturamento-hoje',
  standalone: true,
  templateUrl: './faturamento-hoje.component.html',
  styleUrls: ['./faturamento-hoje.component.scss'],
})
export class FaturamentoHojeComponent implements OnChanges {
  @Input() agendamentos: any[] = [];
  faturamentoHoje: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agendamentos'] && this.agendamentos.length > 0) {
      this.calcularFaturamentoHoje();
    }
  }

  calcularFaturamentoHoje(): void {
    const hoje = new Date().toISOString().split('T')[0];

    this.faturamentoHoje = this.agendamentos
      .filter((agendamento) => agendamento.data.split('T')[0] === hoje)
      .reduce((total, agendamento) => total + (agendamento.valor || 0), 0);
  }
}
