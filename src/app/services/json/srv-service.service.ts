import { Injectable } from '@angular/core';
import { Product } from '../models/productmodel';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SrvService {
  products: Product[] = [];
  productsadd: Product[] = [];
  productsedit: Product[] = [];
  link = 'http://localhost:3000/products/';
  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(public http: HttpClient) {
  }

  async getProducts() {
    this.products = [];

    const data = await this.http
      .get(this.link)
      .toPromise();

    for (const index in data) {
      this.products.push(data[index]);
    }
  }

  async addProduct(product: Product) {
    this.productsadd = [];
    const dataadd = await this.http
      .get(this.link)
      .toPromise();

    for (const index in dataadd) {
      this.productsadd.push(dataadd[index]);
    }
    return this.http.post(this.link, product, this.options).toPromise();
  }

  async removeProduct(id: number) {
    let linkdel = this.link + id;
    return this.http.request('delete', linkdel, { body: { id } }).toPromise();
  }

  async editProduct(product: Product) {
    this.productsedit = [];
    const dataedit = await this.http
      .get(this.link)
      .toPromise();

    for (const index in dataedit) {
      this.productsedit.push(dataedit[index]);
    }

    let link = this.link + product.id;
    return this.http.put(link, product, this.options).toPromise();
  }
}
