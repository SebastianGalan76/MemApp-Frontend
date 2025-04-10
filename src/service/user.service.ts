import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from './cookie.service';
import { User } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User | null = null;

  constructor(
    private apiService: ApiService,
  ) { }

  setUser(user: User) {
    this.user = user;
    this.saveUser();
  }

  getUser(): Observable<User | null> {
    if (this.user) {
      return of(this.user);
    }

    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      if (CookieService.isJwtTokenExpired()) {
        sessionStorage.removeItem('user');
        return of(null);
      }

      this.user = JSON.parse(storedUser);
      return of(this.user);
    }
    return this.apiService.get<User | null>("/user", { withCredentials: true }).pipe(
      map(data => {
        if (data) {
          this.user = data;

          this.saveUser();
          return this.user;
        } else {
          this.user = null;
          return null;
        }
      }),
      catchError(error => {
        console.error('Błąd pobierania użytkownika', error);
        return of(null);
      })
    );
  }

  saveUser(user: User | null = this.user) {
    if (!user) {
      sessionStorage.removeItem('user');
      this.user = null;
      return;
    }

    try {
      const userString = JSON.stringify(user);
      sessionStorage.setItem('user', userString);
      this.user = user;
    } catch (error) {
      console.error('Błąd podczas zapisywania użytkownika:', error);
    }
  }


  logout() {
    sessionStorage.removeItem('user');
    CookieService.eraseCookie('jwt_token');
    this.user = null;
  }
}
