import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsType} from "../../../state/product.state";
import {Product} from "../../../model/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products$:Observable<AppDataState<Product[]>> |null=null;
  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  readonly DatastateEnum=DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product) {
    this.productsEventEmitter.emit({type:ProductActionsType.SELECT_PRODUCT,payload:p})
  }

  onDeleteProduct(p: Product) {
    this.productsEventEmitter.emit({type:ProductActionsType.DELETE_PRODUCT,payload:p})
  }

  onEditProduct(p: Product) {
    this.productsEventEmitter.emit({type:ProductActionsType.EDIT_PRODUCT,payload:p})
  }

  onActionEvent($event: ActionEvent) {
   this.productsEventEmitter.emit($event);
  }
}
