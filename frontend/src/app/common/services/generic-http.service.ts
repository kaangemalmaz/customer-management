
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {

  constructor(
    private http: HttpClient
  ) { }

  get<T>(url: string, callback: (res: T) => void) {
    this.http.get<T>(url).subscribe({
      next: (res: T) => {
        callback(res);
      },
    });
  }

  post<T>(url: string, model: any, callback: (res: T) => void) {
    this.http.post<T>(url, model, {}).subscribe({
      next: (res: T) => {
        callback(res);
      },
      error(err) { },
    });
  }

  put<T>(url: string, model: any, callback: (res: T) => void) {
    this.http.put<T>(url, model, {}).subscribe({
      next: (res: T) => {
        callback(res);
      },
      error(err) { },
    });
  }

  delete<T>(url: string, callback: (res: T) => void) {
    this.http.delete<T>(url).subscribe({
      next: (res: T) => {
        callback(res);
      },
      error(err) { },
    });
  }
}