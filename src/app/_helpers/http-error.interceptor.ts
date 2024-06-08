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
          console.log("Back end issue");
          errorMsg = `Error: ${error.statusText}`;
        }
        else if (error.error instanceof Blob && error.error.type == "application/json") {
          error.error.text().then((err) => {
            errorMsg = err;
            this._snackBar.open(errorMsg, "Ok", { duration: 3000, panelClass: ['mat-toolbar', 'mat-warn'] });
            return throwError(() => new Error(errorMsg))
          })
        }
        else if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        }
        else {
          console.log('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        this._snackBar.open(errorMsg, "Ok", { duration: 2000, panelClass: ['mat-toolbar', 'mat-warn'] });
        return throwError(() => new Error(errorMsg))
      })
    )
  }

}

