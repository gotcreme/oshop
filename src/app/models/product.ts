import * as firebase from 'firebase';

export class Product {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    key: string;

    constructor(dataSnapshot: firebase.database.DataSnapshot) {
        this.title = dataSnapshot.val().title;
        this.price = dataSnapshot.val().price;
        this.category = dataSnapshot.val().category;
        this.imageUrl = dataSnapshot.val().imageUrl;
        this.key = dataSnapshot.key;
    }
}