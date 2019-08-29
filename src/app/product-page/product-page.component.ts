import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

declare var $: any;

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {

  public products: any = [];
  public apiResponse = false;
  public minimum = ['50', '100', '200', '300', '500'];
  public maximum = ['500', '600', '600', '700', '800+'];
  public minPrice: any;
  public maxPrice: any;
  public itemFrom = 1;
  public itemOnPage = 2;
  public pageSize = 2;
  public p = 1;
  public brands: any = [];
  public categories = [];
  public mat_price: any;
  public urlKeywords: any;
  public query: any;
  public searchString: any;

  constructor(private route: ActivatedRoute, private router: Router, private httpService: ApiService) {}

  ngOnInit() {
    // Determine route
      this.urlKeywords = this.router.url.split('/');
    // Get all categories
    this.httpService.getAllCategories()
    .subscribe(
      (response: any) => {
        this.categories = response.data[0].cat;
      },
      error => {
        console.log('Error! ', error);
      }
    );
    // fetch products
      this.httpService.getProducts()
        .subscribe(
          (response: any) => {
            if (this.urlKeywords.length === 5) {
              this.products = response.data;
            }
            if (this.urlKeywords.length === 3) {
              this.products = response.data.filter(function(x: any) {
                return x.product_title.toLowerCase().includes(this.urlKeywords[2]);
              });
            }
            if (this.urlKeywords.length === 2) {
              this.route.queryParams.subscribe(params => {
                this.query = params['query'];
              });
              const that = this;
              this.products = response.data.filter(function(x: any) {
                return x.product_title.toLowerCase().includes(that.query);
              });
            }
            this.apiResponse = true;
          },
          error => {
            console.log('Error! ', error);
          }
        );
    // accordion
      $('.accordion-group .accordion-toggle').click(function () {
        $(this).children('i').addClass('fa-angle-down');
        $(this).children('i').toggleClass('fa-angle-up');
      });
  }



/***  FUCNTIONS DEFINITION STARTS ***/

  // Reset pagination
    public resetPagination() {
      this.p = 1;
    }
  // Get minimum value
    public minValue(minVal: any) {
      this.minPrice = minVal;
      if (this.minPrice && this.maxPrice) {
        this.resetPagination();
      }
    }
  // Get maximum value
    public maxValue(maxVal: any) {
      this.maxPrice = maxVal;
      if (this.minPrice && this.maxPrice) {
        this.resetPagination();
      }
    }
  // Pagination page change event
    public pageChanged(p: any) {
      this.itemFrom = ((p - 1) * this.pageSize) + 1;
      this.itemOnPage = p * this.pageSize;
    }
  // Get brands from checkboxes
    public checkedBrands(e: any) {
      if (e.target.checked === true) {
        this.brands.push({'name': e.target.value});
      } else {
        this.brands = this.brands.filter(function(x: any) {
          return (x.name !== e.target.value);
        });
      }
      this.resetPagination();
    }
  // Get maximum range of price
    public getRange(value: any) {
      this.mat_price = value;
      this.resetPagination();
    }

/***  FUCNTIONS DEFINITION ENDS ***/

}
