import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SrvService} from '../services/json/srv-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  
  
  id:number;

  constructor(private srv: SrvService, private activatedRouter: ActivatedRoute,private router: Router) {
    this.activatedRouter.params.subscribe(param => {
      this.id = parseInt(param.id,10);
    })
   }


   productForm: FormGroup;
   disabledControl: boolean;
   minNum = 0;
  ngOnInit(): void {

    this.productForm = new FormGroup({
      name: new FormControl({value:'', disabled: this.disabledControl}, [Validators.required]),
      article: new FormControl({value:'', disabled: this.disabledControl}, [Validators.required]),
      price: new FormControl({value:'', disabled: this.disabledControl}, [Validators.required]),
      manufacture: new FormControl({value:'', disabled: this.disabledControl}, []),
      category: new FormControl({value:'', disabled: this.disabledControl}, [Validators.required]),
      weight: new FormControl({value:'', disabled: this.disabledControl}, [Validators.required]),
      amount: new FormControl({value:'' , disabled: this.disabledControl}, [Validators.required,Validators.min(this.minNum)]),
    });

    if (this.id){
      this.srv.getProducts().then(()=>{
        (this.srv.products).forEach(product=>{
          if (product.id === this.id){

            const item = product;
            delete item.id;
            this.productForm.setValue(item);
          }
          })
      })
    }

  }

  isNaN(id:number){
    return isNaN(id);
  }


  async onDelete(id){
    try {
      await this.srv.removeProduct(id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/list']);
  }


  onEdit(id){
    let product = this.productForm.value;
    product.id = id;
    this.srv.editProduct(product).then(() =>
    this.router.navigate(['/list']));
  }

  onAdd(){
    const studnew = this.productForm.value;
    this.srv.addProduct(studnew).then(()=>{
      this.productForm.reset();
      this.router.navigate(["list"])
    })}


}
