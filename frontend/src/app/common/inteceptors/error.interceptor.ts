import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiError } from '../models/api-error.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const apiError: ApiError = {
          name: error.name,
          message: error.error?.message || 'Bilinmeyen bir hata oluştu.',
          statusCode: error.status || 500,
          errors: error.error?.errors,
          stack: error.error?.stack,
        };

        if (apiError.statusCode === 401 || apiError.statusCode === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: apiError.message,
          }).then(() => {
            localStorage.clear();
            this.router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: apiError.message,
          });
        }

        return throwError(() => apiError);
      })
    );
  }
}
