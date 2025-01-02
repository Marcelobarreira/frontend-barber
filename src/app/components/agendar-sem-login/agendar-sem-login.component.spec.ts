import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarSemLoginComponent } from './agendar-sem-login.component';

describe('AgendarSemLoginComponent', () => {
  let component: AgendarSemLoginComponent;
  let fixture: ComponentFixture<AgendarSemLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarSemLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarSemLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
