import { TestBed } from '@angular/core/testing';

import { GuardService } from './guard.service';
import { CanActivateFn } from '@angular/router';
describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => GuardService(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
