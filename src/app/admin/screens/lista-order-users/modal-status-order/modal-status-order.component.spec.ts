import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatusOrderComponent } from './modal-status-order.component';

describe('ModalStatusOrderComponent', () => {
  let component: ModalStatusOrderComponent;
  let fixture: ComponentFixture<ModalStatusOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStatusOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStatusOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
