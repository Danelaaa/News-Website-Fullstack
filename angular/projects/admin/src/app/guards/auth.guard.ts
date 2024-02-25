import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';

import {switchMap, tap} from "rxjs/operators";
import {stat} from "ng-packagr/lib/utils/fs";
import { ApiService } from '../../../../tools/src/lib/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService,
              private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.apiService.getAuthState().pipe(
      tap(value => {
        if (!value) {
          this.router.navigate(['login']).then();
          return false;
        } else {
          return true;
        }
      })
    );
  }

}