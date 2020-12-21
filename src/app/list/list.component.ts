import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';

import { SrvService } from '../services/json/srv-service.service'
import { Product } from '../services/models/productmodel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() FilterProductsList = new EventEmitter<object>();

  productFilter: any = { category: '', amount: '' };

  products: Product[];
  productsfiltered: Product[];

  filterbtnstate = 1;

  searching = {
    Amount: 1,
  };

  sorting = false;

  constructor(private srv: SrvService, private router: Router) { }

  onFilter(id) {
    this.productsfiltered = [];
    this.productsfiltered = this.products;


    if (id === 0) {
        this.filterbtnstate = 1;

    }
    if (id === 1) {


      this.productsfiltered = this.products.filter(product => product.amount > 0)
      

      this.filterbtnstate = 2;
    }
    if (id === 2) {
      this.productsfiltered = this.products.filter(product => product.amount < 1)


      this.filterbtnstate = 3;
    }
  }


  onFilterWorkersList() {
    this.FilterProductsList.emit(this.searching);
  }




  onChangeAmount(product, id) {

    this.onFilter(0);

    if (id === 1) {
      product.amount = product.amount + 1;
      this.srv.editProduct(product);
    } else if (id === 0) {
      product.amount = product.amount - 1;
      this.srv.editProduct(product);

  

    }




  }

  useSortingAmount() {

    if (this.sorting == false) {
      this.sorting = true;
      this.products.sort((prev, next) => {
        if (prev.amount < next.amount) return -1;
        else if (prev.amount > next.amount) return 1;
        else return 0;
      });

    }
    else if (this.sorting == true) {
      this.sorting = false;
      this.products.sort((prev, next) => {
        if (prev.amount > next.amount) return -1;
        else if (prev.amount < next.amount) return 1;
        else return 0;

      });

    }
  }


  useSortingPrice() {

    if (this.sorting == false) {
      this.sorting = true;
      this.products.sort((prev, next) => {
        if (prev.price < next.price) return -1;
        else if (prev.price > next.price) return 1;
        else return 0;
      });

    }
    else if (this.sorting == true) {
      this.sorting = false;
      this.products.sort((prev, next) => {
        if (prev.price > next.price) return -1;
        else if (prev.price < next.price) return 1;
        else return 0;

      });

    }
  }

  ngOnInit(): void {

    this.products = [];
    this.productsfiltered = [];

    this.srv.getProducts().then(
      () => {(this.srv.products).forEach(product => this.products.push(product)); this.productsfiltered = this.products;}
      
      );

    

      

  }



  async onDelete(id) {
    try {
      await this.srv.removeProduct(id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/list']);
    this.products = [];
    this.srv.getProducts().then(() =>
      (this.srv.products).forEach(product => this.products.push(product)))
  }

}
