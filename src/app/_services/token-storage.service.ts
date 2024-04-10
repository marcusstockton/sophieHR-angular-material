import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { IUserTokens, UserTokens } from '../client';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public isLoggedIn: boolean = false;
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    var token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token != null) {
      this.isLoggedIn = true;
      return token;
    }
    return null;
  }

  public saveUser(user: IUserTokens): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): IUserTokens | null {
    const user = window.sessionStorage.getItem(USER_KEY);

    var token = window.sessionStorage.getItem(TOKEN_KEY);
    var decodedJwt = jwt_decode.jwtDecode(token!); // Could use the decoded jwt info here. I'm not, but i could

    if (user) {
      return JSON.parse(user) as IUserTokens;
    }
    return null;
  }
}
