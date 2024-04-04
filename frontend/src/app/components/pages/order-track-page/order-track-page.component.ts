import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent {

  order!:Order;
  constructor(activateRoute:ActivatedRoute,orderService:OrderService) {
    const parms = activateRoute.snapshot.params;
    if(!parms['orderId'])
    {
      return;
    }

    orderService.trackOrderById(parms['orderId']).subscribe(order =>{
      this.order = order;
    })

  }

}
