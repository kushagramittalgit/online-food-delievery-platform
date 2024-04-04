import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import { Message } from 'primeng/api';

declare var paypal: any;
@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {
  @Input()
  order!: Order

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  messages: Message[] = [];

  constructor(private orderService: OrderService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'CAD',
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe(
            {
              next: (orderId) => {
                this.cartService.clearCart();
                this.router.navigateByUrl('/track/' + orderId);
                this.messages = [{ severity: 'success', summary: 'Success', detail: 'Payment saved Succesfully' }];
              },
              error: (error) => {
                this.messages = [{ severity: 'error', summary: 'Error', detail: 'Payment save error' }];
              }
            }
          );
        },

        onError: (err: any) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: `payment failed ${err}` }];
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);

  }
}
