import { Product } from './product';
import * as firebase from 'firebase';

export class ShoppingCartItem {
    product: Product;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) {
			Object.assign(this, init);	
    }

    get totalPrice() { return this.product.price * this.quantity; }
}