import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProfileUserComponent } from './modal-profile-user.component';

describe('ModalProfileUserComponent', () => {
  let component: ModalProfileUserComponent;
  let fixture: ComponentFixture<ModalProfileUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProfileUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProfileUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
