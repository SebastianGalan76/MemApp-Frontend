import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  context?: HttpContext;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
    includeHeaders?: string[];
  } | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get<T>(endpoint: string, options: Partial<HttpOptions>): Observable<T> {
    const url = AppService.getBackendDomain() + endpoint;
    return this.httpClient.get<T>(url, this.createHttpOptions(options)) as Observable<T>;
  }

  post<T>(endpoint: string, body: any | null, options: Partial<HttpOptions>): Observable<T> {
    const url = AppService.getBackendDomain() + endpoint;
    return this.httpClient.post<T>(url, body, this.createHttpOptions(options)) as Observable<T>;
  }

  put<T>(endpoint: string, body: any | null, options: Partial<HttpOptions>): Observable<T> {
    const url = AppService.getBackendDomain() + endpoint;
    return this.httpClient.put<T>(url, body, this.createHttpOptions(options)) as Observable<T>;
  }

  delete<T>(endpoint: string, options: Partial<HttpOptions>): Observable<T> {
    const url = AppService.getBackendDomain() + endpoint;
    return this.httpClient.delete<T>(url, this.createHttpOptions(options)) as Observable<T>;
  }

  private createHttpOptions(customOptions: Partial<HttpOptions> = {}): HttpOptions {
    const defaultOptions: HttpOptions = {
      withCredentials: true,
    };

    return { ...defaultOptions, ...customOptions };
  }
}
