import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/Cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(food:Food)
  {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);

    if(cartItem)
    {
      cartItem.quantity++;
    }

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId:string)
  {
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId:string,quantity:number)
  {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);

    if(!cartItem)
    {
      return;
    }
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart()
  {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObserable():Observable<Cart>
  {
    return this.cartSubject.asObservable();
  }

  getCart():Cart
  {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage()
  {
    this.cart.totalPrice = this.cart.items.reduce((prev,curr) => prev + curr.price,0); // sum of all prices
    this.cart.totalQuantity = this.cart.items.reduce((prev,curr) => prev + curr.quantity,0); // sum of all quantities

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem("cart",cartJson);

    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart
  {
    const cartJson = localStorage.getItem("cart");
    if(cartJson)
    {
      return JSON.parse(cartJson);
    }
    else
    {
      return new Cart();
    }
  }
}
