import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhDeComprasComponent } from './carrinho-de-compras.component';

describe('CarrinhDeComprasComponent', () => {
  let component: CarrinhDeComprasComponent;
  let fixture: ComponentFixture<CarrinhDeComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhDeComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhDeComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
