import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private _tokenService: TokenStorageService, private _router: Router) { }
  canActivate(): boolean {
    if (this._tokenService.isLoggedIn) {
      return true;
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
}
