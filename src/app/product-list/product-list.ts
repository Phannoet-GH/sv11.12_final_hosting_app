import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productcard } from '../productcard/productcard';
import { ProductService } from '../service/product-service';
import { CartService } from '../service/cart-service';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, Productcard, Footer],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  handleAddToCart(product: any) {
    this.cartService.addToCart(product);
  }

  trackById(index: number, item: any): any {
    return item.id;
  }
}