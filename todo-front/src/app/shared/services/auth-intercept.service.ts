import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take, exhaustMap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1), exhaustMap(user => {
        if (user && user.token) {
          const modifiedReq = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + user.token)
          })
          return next.handle(modifiedReq)
        }
        return next.handle(req)
      })
    )
  }

}
