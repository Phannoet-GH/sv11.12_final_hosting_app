// cart.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { CartService } from '../service/cart-service';
import { InvoiceService } from '../service/invoice-service'; // Import the new service
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare const Swal: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  selectedItems: any[] = [];

  constructor(
    private cartService: CartService,
    private invoiceService: InvoiceService, // Inject the new service
    private router: Router // Inject the Router
  ) {}

  ngOnInit(): void {
    this.fetchCartItems();
    this.cartService.cartCount$.subscribe(() => {
      this.fetchCartItems();
    });
  }

  fetchCartItems() {
    this.cartItems = this.cartService.getItems().map(item => ({ ...item, selected: false }));
    this.selectedItems = [];
  }

  removeFromCart(id: number): void {
    Swal.fire({
      title: 'Remove this item?',
      text: 'Are you sure you want to remove this product from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(id);
        Swal.fire({
          title: 'Removed!',
          text: 'The item has been removed from your cart.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  updateQuantity(id: number, quantity: number): void {
    const items = this.cartItems.map(item => item.id === id ? { ...item, quantity: quantity } : item);
    this.cartService.updateCart(items);
    this.updateSelectedItems();
  }

  toggleSelection(item: any, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      item.selected = target.checked;
      this.updateSelectedItems();
    }
  }

  updateSelectedItems(): void {
    this.selectedItems = this.cartItems.filter(item => item.selected);
  }

  clearCart(): void {
    Swal.fire({
      title: 'Clear entire cart?',
      text: 'Are you sure you want to remove all products from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Clear',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.cartService.clearCart();
        Swal.fire({
          title: 'Cart Cleared!',
          text: 'All items have been removed from your cart.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  proceedToCheckout(): void {
    // 1. Save the selected items to the InvoiceService
    this.invoiceService.setInvoiceItems(this.selectedItems);
    // 2. Navigate to the invoice page
    this.router.navigate(['/invoice']);
  }

  getSubtotal(): number {
    return this.selectedItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.00;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }
}