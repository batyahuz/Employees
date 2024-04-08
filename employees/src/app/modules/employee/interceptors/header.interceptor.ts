import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var token: string;
        if (sessionStorage.getItem('authorization') != null)
            token =
                sessionStorage.getItem('authorization')
        else
            token = 'Bearer '

        const modifiedReq = req.clone({
             headers: req.headers.set('Authorization', token).set('Accept', 'application/json')
             });

        return next.handle(modifiedReq);
    }
}
