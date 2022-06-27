import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BasicJwtService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.accessToken;
    req = req.clone({
      setHeaders: {
        Accept : 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });

    return next.handle(req);
  }
}
