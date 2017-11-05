import { AngularFireAction } from "angularfire2/database";
import * as firebase from 'firebase';

export class Product {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    key: string;

    constructor(firebaseObj: AngularFireAction<firebase.database.DataSnapshot>) {
        this.title = firebaseObj.payload.val().title;
        this.price = firebaseObj.payload.val().price;
        this.category = firebaseObj.payload.val().category;
        this.imageUrl = firebaseObj.payload.val().imageUrl;
        this.key = firebaseObj.payload.key;
    }
}