import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { LoadingService } from '../services/loading-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private _loading: LoadingService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, req.url);

    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + this.authService.getToken(),
        },
      });
    }

     return next
       .handle(req)
       .pipe(
         catchError((err) => {
           this._loading.setLoading(false, req.url);
           return err;
         })
       )
       .pipe(
         map<unknown, any>((evt: unknown) => {
           if (evt instanceof HttpResponse) {
             this._loading.setLoading(false, req.url);
           }
           return evt;
         })
       );
  }
}
