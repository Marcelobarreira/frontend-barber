import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturamentoHojeComponent } from './faturamento-hoje.component';

describe('FaturamentoHojeComponent', () => {
  let component: FaturamentoHojeComponent;
  let fixture: ComponentFixture<FaturamentoHojeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaturamentoHojeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaturamentoHojeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
