import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenStorageService } from '../_services/token-storage.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['isLoggedIn'])
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: TokenStorageService, useValue: mockTokenStorageService },
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should navigate', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    mockTokenStorageService.isLoggedIn = false;
    guard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(guard.canActivate()).toBeFalse();
  }));

  it('should return true', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    mockTokenStorageService.isLoggedIn = true;
    guard.canActivate();
    expect(guard.canActivate()).toBeTrue();
  }));

});
