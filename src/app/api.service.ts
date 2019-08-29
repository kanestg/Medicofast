import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public rootUrl = 'https://dev.oydtechnologies.com/api/';

  public invokeUpdateCartFunction = new EventEmitter();
  public subsVar: Subscription;

  private previousUrl = '/';

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url !== '/account/login' && event.url !== '/account/forgot' && event.url !== '/account/signup') {
        this.previousUrl = event.url;
      }
    });
  }



/***  FUCNTIONS DEFINITION STARTS ***/

  // Get previous url
    public getPreviousUrl() {
      return this.previousUrl;
    }
  // Update cart
    public callUpdateCart() {
      this.invokeUpdateCartFunction.emit();
    }
  // Get categories
    public getAllCategories() {
      return this.http.get(this.rootUrl + 'cat.php');
    }
  // User registration
    public userRegistration(value: any) {
      const data = {
        'method': 'POST',
        'request': 'userRegistration',
        'name': value.name,
        'email': value.email,
        'password': value.password
      };
      const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(this.rootUrl + 'login.php', data, {headers: reqHeader});
    }
  // User login
    public userLogin(value: any) {
      const data = {
        'method': 'POST',
        'request': 'userLogin',
        'email': value.email,
        'password': value.password
      };
      const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(this.rootUrl + 'login.php', data, {headers: reqHeader});
    }
  // User forgot
    public userForgot(email: any, otp: any, password: any) {
      console.log(email, otp, password);
      const data = {
        'email': email,
        'otp': otp,
        'password': password
      };
      console.log(data);
      const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(this.rootUrl + '/userForgot', data, {headers: reqHeader});
    }
  // Fetch products
    public getProducts() {
      const data = {
        'method': 'GET',
        'request': 'getProducts'
      };
      const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(this.rootUrl + 'product.php', data, {headers: reqHeader});
    }

/***  FUCNTIONS DEFINITION ENDS ***/

}
