import { Pipe, PipeTransform } from '@angular/core';

// Minimum and Maximum price filter
@Pipe({
  name: 'filterMinMaxPrice'
})
export class FilterMinMaxPrice implements PipeTransform {
  transform(value: any, arg1: any, arg2: any): any {
    if (arg1 && arg2) {
      return value.filter((val: any) => {
        if (parseFloat(val.product_offer_price) >= parseFloat(arg1) && parseFloat(val.product_offer_price) <= parseFloat(arg2)) {
          return val;
        }
        if (arg2 === '800+') {
          return value;
        }
      });
    } else {
      return value;
    }
  }
}

// Maximum range price filter
@Pipe({
  name: 'filterRangePrice',
  pure: true
})
export class FilterRangePrice implements PipeTransform {
  transform(value: any, args: any): any {
    if (args) {
      return value.filter((val: any) => {
        if (parseFloat(val.product_offer_price) <= parseFloat(args)) {
          return val;
        }
      });
    } else {
      return value;
    }
  }
}

// Brands filter
@Pipe({
  name: 'filterBrands',
  pure: false
})
export class FilterBrands implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args.length > 0) {
      return value.filter((val: any) => {
        for (let i = 0; i < args.length; i++) {
          if (val.product_brand === args[i].name) {
            return val;
          }
        }
      });
    } else {
      return value;
    }
  }
}

// Hightlight text filter
@Pipe({
  name: 'highlight',
  pure: false
})
export class Highlight implements PipeTransform {
  transform(text: string, search: any): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, match => `<b>${match}</b>`) : text;
  }
}
