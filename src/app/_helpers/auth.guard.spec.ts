import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockTokenStorageService: { isLoggedIn: boolean };
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockTokenStorageService = { isLoggedIn: false };
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: TokenStorageService, useValue: mockTokenStorageService },
        { provide: Router, useValue: mockRouter },
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should deny activation and redirect to login when the user is not logged in', () => {
    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow activation and avoid redirecting when the user is logged in', () => {
    mockTokenStorageService.isLoggedIn = true;

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
