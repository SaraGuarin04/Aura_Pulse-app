import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Session } from './session';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(Session);
  const token = sessionService.getToken();

  let headers = req.headers
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const clonedReq = req.clone({ headers });

  return next(clonedReq);
};