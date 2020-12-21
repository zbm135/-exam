import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoremComponent} from '../app/lorem/lorem.component';
import {AddEditComponent} from '../app/add-edit/add-edit.component';
import {ListComponent} from '../app/list/list.component';



const routes: Routes = [
  {path:'', component:LoremComponent},
  {path:'list',component:ListComponent},
  {path:'add',component:AddEditComponent},
  {path:'edit/:id',component:AddEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
