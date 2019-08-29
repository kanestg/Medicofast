import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public getUser: any;
  public cartItem = [];
  public options = [];
  public Login = false;
  public keywords: any;
  public toHighlight: any;
  public myControl = new FormControl();
  public filteredOptions: Observable<string[]>;

  constructor(private router: Router, private httpService: ApiService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
   // google oauth initialization
    gapi.load('auth2', function () {
      gapi.auth2.init();
    });
  }

  ngOnInit() {
    // Get search keywords
      this.httpService.getProducts()
        .subscribe(
          (response: any) => {
            this.options = response.data;
          },
          error => {
            console.log('Error! ', error);
          }
        );
    // Get items from local storage
      if (localStorage.getItem('userProfile')) {
        this.getUser = JSON.parse(localStorage.getItem('userProfile'));
        this.Login = true;
      }
      this.updateCart();
      if (this.httpService.subsVar === undefined) {
        this.httpService.subsVar = this.httpService.
        invokeUpdateCartFunction.subscribe(() => {
          this.updateCart();
        });
      }
    // Search filter options
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }



/***  FUCNTIONS DEFINITION STARTS ***/

  // Update cart
    public updateCart() {
      if (localStorage.getItem('cartItem')) {
        this.cartItem = JSON.parse(localStorage.getItem('cartItem'));
      }
    }
  // Signout user
    public googleSignout(error: any) {
      if (error === false) {
        localStorage.removeItem('userProfile');
        location.reload();
      } else {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          localStorage.removeItem('userProfile');
          location.reload();
        });
      }
    }
  // search filter keywords
    private _filter(value: string): string[] {
      if (value) {
        this.toHighlight = value;
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.product_title.toLowerCase().indexOf(filterValue) === 0);
      }
    }
  // search filter
    public onSearch() {
      this.keywords = this.myControl.value;
      this.router.navigate(['/search'], { queryParams: { query: this.keywords.toLowerCase() } });
      this.myControl.reset();
    }

/***  FUCNTIONS DEFINITION ENDS ***/

}
