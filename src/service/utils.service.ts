import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  static getPostAmountString(amount: number): string {
    if (amount == 1) {
      return "1 Post";
    }
    if (amount > 1 && amount < 5) {
      return amount + " Posty";
    }
    return amount + " Postów";
  }

  static getUserAmountString(amount: number): string {
    if (amount == 1) {
      return "1 Użytkownika";
    }
    return amount + "  Użytkowników";
  }
}
