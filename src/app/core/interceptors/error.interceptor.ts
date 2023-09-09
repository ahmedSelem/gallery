import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorinterceptorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _toastrService: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse) => {
        // Based on the error status, handle the error accordingly
        switch (errorResponse.status) {
          case 401: // Unauthorized
            this._toastrService.error(
              errorResponse.error.message,
              errorResponse.status.toString()
            );
            break;

          case 400: // Bad Request
            if (errorResponse.error.errors) {
              throw errorResponse.error;
            } else {
              this._toastrService.error(
                errorResponse.error.message,
                errorResponse.status.toString()
              );
            }
            break;

          case 404: // Not Found
            this._router.navigateByUrl('./noFound');
            break;

          case 500: // Internal Server Error
            const navigationExtras: NavigationExtras = {
              state: { error: errorResponse.error },
            };
            this._router.navigateByUrl('/server-error', navigationExtras);
            break;

          default: // Handle other status codes if needed
            this._toastrService.error(
              errorResponse.error.message || errorResponse.statusText
            );
            break;
        }

        // Return the error to the caller
        return throwError(
          () => errorResponse.error.message || errorResponse.statusText
        );
      })
    );
  }
}
