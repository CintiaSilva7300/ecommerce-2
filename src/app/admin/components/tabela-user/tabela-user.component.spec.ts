import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaUserComponent } from './tabela-user.component';

describe('TabelaUserComponent', () => {
  let component: TabelaUserComponent;
  let fixture: ComponentFixture<TabelaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
