import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap, RoutesRecognized } from '@angular/router';



@Injectable()
export class I1 implements HttpInterceptor {
  // constructor(private activatedRoute: ActivatedRoute) {
  //   // subscribe to router event
  //   this.activatedRoute.queryParams.subscribe((params) => {
  //     this.token = params.token;
  //     console.log(this.token);
  //   });

  // }
  token: string;
  constructor(private activatedRoute: ActivatedRoute) { };

  getToken(): string{
     this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params.token;
      // console.log(this.token);
    });
    return this.token;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //this.token = params.token;
    // console.log(req.params.get('token'));
    const modified = req.clone({ setHeaders: { Authorization: `Bearer ${this.getToken()}` } });
     //const modified = req.clone({ setHeaders: { Authorization: `Bearer` } });

    return next.handle(modified);
  }
}
