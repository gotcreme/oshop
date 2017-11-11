import { Product } from './product';
import { AngularFireAction } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  private itemsMap: any;
	key: string;
	items: ShoppingCartItem[] = [];

	constructor(firebaseObj: firebase.database.DataSnapshot) {
		this.key = firebaseObj.key;
		this.itemsMap = firebaseObj.val().items;

		for (let productId in this.itemsMap)
			this.items.push(new ShoppingCartItem(this.itemsMap[productId]));
	}

	get totalItemsCount() {
		let count = 0;
		for (let productId in this.itemsMap) 
			count += this.itemsMap[productId].quantity;
			
		return count;
	}

	get productIds() {
		return Object.keys(this.itemsMap);
  }
  
  get totalPrice() {
    let sum = 0;
    this.items.forEach(i => sum += i.totalPrice);
    return sum;
  }

  getQuantity(product: Product) {
    if (!this.itemsMap) return 0;

    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
}