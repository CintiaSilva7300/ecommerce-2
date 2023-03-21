import { TestBed } from '@angular/core/testing';

import { AuthorizedRoutesGuard } from './authorized-routes.guard';

describe('AuthorizedRoutesGuard', () => {
  let guard: AuthorizedRoutesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizedRoutesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
