import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public cartItem = [];
  public cartTotal: any;

  constructor(private httpService: ApiService) {}

  ngOnInit() {
    this.getItem();
  }



/***  FUCNTIONS DEFINITION STARTS ***/

  // Get item from local storage
    public getItem() {
      if (localStorage.getItem('cartItem')) {
        this.cartItem = JSON.parse(localStorage.getItem('cartItem'));
        this.cartTotal = this.cartItem.reduce((sum, item) => sum + Number(item.product_offer_price * item.product_quantity), 0);
        this.cartItem = this.cartItem.map(function (x: any) {
          x.newPrice = (x.product_offer_price * x.product_quantity);
          return x;
        });
      }
    }
  // Remove item from cart
    public removeItem(value: any) {
      const that = this;
      this.cartItem = that.cartItem.filter(function(x: any) {
        return (x.product_id !== value);
      });
      localStorage.setItem('cartItem', JSON.stringify(this.cartItem));
      this.httpService.callUpdateCart();
      this.getItem();
    }
  // Increase quantity of an item
    public selectOption(quantity: any, id: any) {
      this.cartItem = JSON.parse(localStorage.getItem('cartItem'));
      this.cartItem = this.cartItem.map(function(x: any) {
        if (x.product_id === id) {
          x.product_quantity = quantity;
        }
        return x;
      });
      localStorage.setItem('cartItem', JSON.stringify(this.cartItem));
      this.getItem();
    }

/***  FUCNTIONS DEFINITION ENDS ***/

}
