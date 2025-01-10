import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  static setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `expires=${date.toUTCString()};`;
    }

    if (AppService.developMode) {
      document.cookie = `${name}=${value};${expires}path=/`;
    }
    else {
      document.cookie = `${name}=${value};${expires}path=/;domain=${AppService.getDomain()};SameSite=None;Secure`;
    }
  }

  static getCookie(name: string): string | undefined {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return undefined;
  }

  static eraseCookie(name: string) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  }

  static isJwtTokenExpired(): boolean {
    const token = this.getCookie('jwt_token');
    if (!token) {
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }
}
