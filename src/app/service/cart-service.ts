// cart-service.ts
// cart-service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'cart-items';
  private cartCount = new BehaviorSubject<number>(this.getCartCount());
  cartCount$ = this.cartCount.asObservable();

  addToCart(product: any) {
    const items = this.getItems();
    const existing = items.find((item: any) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    this.updateCart(items);
  }

  removeFromCart(id: number) {
    const updatedItems = this.getItems().filter(item => item.id !== id);
    this.updateCart(updatedItems);
  }

  getItems(): any[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  updateCart(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cartCount.next(this.getCartCount());
  }

  getCartCount(): number {
    return this.getItems().reduce((sum, item) => sum + (item.quantity || 0), 0);
  }

  clearCart() {
    localStorage.removeItem(this.storageKey);
    this.cartCount.next(0);
  }
}