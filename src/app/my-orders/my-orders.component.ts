import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

    this.orders$ = this.authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
  }
}
