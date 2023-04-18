import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoAdminComponent } from './configuracao-admin.component';

describe('ConfiguracaoAdminComponent', () => {
  let component: ConfiguracaoAdminComponent;
  let fixture: ComponentFixture<ConfiguracaoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracaoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
