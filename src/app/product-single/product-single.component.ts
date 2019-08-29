import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

declare var $: any;

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {

  public productId: any;
  public products = [];
  public related_products = [];
  public cartItem: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private httpService: ApiService) {
    this.callApi();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id;
    // Tooltips Initialization
    $('[data-toggle="popover"]').popover();
  }



/***  FUCNTIONS DEFINITION STARTS ***/

  // Call Api and get products
    public callApi() {
      this.httpService.getProducts()
        .subscribe(
          (response: any) => {
            this.related_products = response.data;
            const that = this;
            this.products = response.data.filter(function(x: any) {
              that.cartItem = false;
              return (x.product_id === that.productId);
            });
            if (localStorage.getItem('cartItem')) {
              let item = [];
              item = JSON.parse(localStorage.getItem('cartItem'));
              item = item.filter(function(x: any) {
                if (x.product_id === that.productId) {
                  return that.cartItem = true;
                }
              });
            }
            if ($('.product-slider').hasClass('slick-initialized')) {
              $('.product-slider').slick('unslick');
          }
          // slick-initialized slick-slider
            this.runslider();
          },
          error => {
            console.log('Error! ', error);
          }
        );
    }
  // Add item into cart
    public addItem() {
      let history = [];
      history = JSON.parse(localStorage.getItem('cartItem')) || [];
      history.push(this.products[0]);
      localStorage.setItem('cartItem', JSON.stringify(history));
      this.httpService.callUpdateCart();
      this.router.navigate(['/checkout']);
    }
  // Go to cart
    public goToCart() {
      this.router.navigate(['/checkout']);
    }
  // Run slick-slider
    public runslider() {
      $(document).ready(function() {
        setTimeout(() => {
          $('#related_product-slider').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 4,
            settings: 'unslick',
            nextArrow: '<div class="slick-next slick-arrow waves-effect fa fa-angle-right"></div>',
            prevArrow: '<div class="slick-prev slick-arrow waves-effect fa fa-angle-left"></div>',
            responsive: [
            {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            }
            },
            {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2
            }
            },
            {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
            }
            ]
            });
        }, 0);
      });
    }

/***  FUCNTIONS DEFINITION ENDS ***/

}
