import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOrderUsersComponent } from './lista-order-users.component';

describe('ListaOrderUsersComponent', () => {
  let component: ListaOrderUsersComponent;
  let fixture: ComponentFixture<ListaOrderUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaOrderUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaOrderUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
