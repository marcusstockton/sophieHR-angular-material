import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.error instanceof ProgressEvent) {
          // Network or backend issue
          errorMsg = `Error: ${error.statusText || 'Network error'}`;
        } else if (error.error instanceof Blob) {
          // Handle Blob errors (e.g., JSON or problem+json)
          return this.handleBlobError(error);
        } else if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMsg = 'Bad Request: The server could not understand the request.';
              break;
            case 401:
              errorMsg = 'Unauthorized: Access is denied due to invalid credentials.';
              break;
            case 403:
              errorMsg = 'Forbidden: You do not have permission to access this resource.';
              break;
            case 404:
              errorMsg = 'Not Found: The requested resource could not be found.';
              break;
            case 500:
              errorMsg = 'Internal Server Error: The server encountered an unexpected condition.';
              break;
            default:
              errorMsg = `Unexpected Error: ${error.statusText || 'Unknown error'}`;
          };

        }

        // Show the error message in a snackbar
        this._snackBar.open(errorMsg, "Ok", { duration: 5000, panelClass: ['error-snackbar'] });
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  private handleBlobError(error: HttpErrorResponse): Observable<never> {
    const reader = new FileReader();
    const blob = error.error as Blob;

    return new Observable((observer) => {
      reader.onload = () => {
        try {
          const errorText = reader.result as string;
          const errorObj = JSON.parse(errorText);

          let errorMsg = '';
          if (errorObj.errors && errorObj.errors.id) {
            errorObj.errors.id.forEach((x: string) => {
              errorMsg += `${x}\n`;
            });
          } else {
            errorMsg = errorObj.message || 'An unknown error occurred.';
          }

          this._snackBar.open(errorMsg, "Ok", { duration: 5000, panelClass: ['warn-snackbar'] });
          observer.error(new Error(errorMsg));
        } catch (e) {
          observer.error(new Error('Failed to parse error response.'));
        }
      };

      reader.onerror = () => {
        observer.error(new Error('Failed to read error response.'));
      };

      reader.readAsText(blob);
    });
  }
}

