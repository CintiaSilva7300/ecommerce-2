import { TestBed } from '@angular/core/testing';

import { AuthorizationRoutesService } from './authorization-routes.service';

describe('AuthorizationRoutesService', () => {
  let service: AuthorizationRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
