import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products$:Observable<AppDataState<Product[]>> |null=null;
selectedproducts$:Observable<AppDataState<Product[]>> |null=null;
 constructor(private  productService:ProductsService ,private router:Router) { }
 readonly DatastateEnum= DataStateEnum;
  ngOnInit(): void {
  }
  onGetAllProducts(){
    this.products$ = this.productService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of(({dataState:DataStateEnum.ERROR,errorMessage:err.message})))

      );
  }
  onGetSelectedProducts(){
    this.products$ = this.productService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of(({dataState:DataStateEnum.ERROR,errorMessage:err.message})))

    );
  }

  onGetAvailableProducts(){
    this.products$ = this.productService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of(({dataState:DataStateEnum.ERROR,errorMessage:err.message})))

    );
  }
  onSearchProducts(dataForm:any){
    this.products$ = this.productService.searchProduct(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of(({dataState:DataStateEnum.ERROR,errorMessage:err.message})))

    );
  }
  onSelect(p:Product) {
this.productService.select(p)
  .subscribe(data=>{
    p.selected=data.selected;
  })
  }


  onDeleteProduct(p: Product) {
    let v = confirm("Etes vous sure?");
    if (v === true)
      this.productService.delete(p)
        .subscribe(data => {
          this.onGetAllProducts();
        })
  }

  onNewProduct() {
this.router.navigateByUrl("/newproduct");
  }

  onEditProduct(p: Product) {
    this.router.navigateByUrl("editproduct/"+p.id) }
}
