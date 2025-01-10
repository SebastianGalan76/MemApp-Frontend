import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    static developMode: boolean = true;

    static getDomain(): string | null {
        if (AppService.developMode) {
            return null;
        }
        return "xmem.pl";
    }

    static getBackendDomain(): string {
        if (AppService.developMode) {
            return "http://localhost:8080";
        }

        return "https://backend.xmem.pl";
    }
}
