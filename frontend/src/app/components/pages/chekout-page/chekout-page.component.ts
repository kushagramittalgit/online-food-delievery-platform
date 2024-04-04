import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { Message } from 'primeng/api';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chekout-page',
  templateUrl: './chekout-page.component.html',
  styleUrls: ['./chekout-page.component.css']
})
export class ChekoutPageComponent implements OnInit{
  order:Order = new Order();
  checkOutForm!: FormGroup;

  messages: Message[] = [];

  constructor(cartService:CartService,private formBuilder:FormBuilder,private userService:UserService,private orderService: OrderService,private router: Router) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice= cart.totalPrice
  }

  ngOnInit(): void {
    let {name,address} = this.userService.currentUser;
    this.checkOutForm = this.formBuilder.group({
      name:[name,Validators.required],
      address:[address, Validators.required],
    })
  }

  get fc()
  {
    return this.checkOutForm.controls;
  }

  createOrder()
  {
    if(this.checkOutForm.invalid)
    {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Please fill the input' }];
      return;
    }
    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    this.orderService.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse) => {
        this.messages = [{ severity: 'error', summary: 'Error', detail: errorResponse.message }];
      }
    })
  }
}
