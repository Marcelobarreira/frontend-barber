import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasDisponiveisComponent } from './datas-disponiveis.component';

describe('DatasDisponiveisComponent', () => {
  let component: DatasDisponiveisComponent;
  let fixture: ComponentFixture<DatasDisponiveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasDisponiveisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasDisponiveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
