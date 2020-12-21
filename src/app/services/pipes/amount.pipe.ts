import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../models/productmodel';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'productFilter',
  pure: false
})
export class AllnamePipe implements PipeTransform {

  transform(products: Product[], searching) : any  {
    
    let checkamount = searching.Amount;

    console.log(checkamount);

    if (!isNullOrUndefined(products)) {

        if (checkamount === 1) {
            let newArr = products.filter(products => 
                products.amount === 0
              );
              return newArr;
        }

        if (checkamount === 2) {
            let newArr = products.filter(products => 
                products.amount > 0
              );
              return newArr;
        }


     
    } else {
      return products;
    }

}
}
