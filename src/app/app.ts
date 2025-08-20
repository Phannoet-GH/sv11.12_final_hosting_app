// app.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { JsonPipe, CommonModule } from '@angular/common';
import { TokhrPipe } from './custom-pipe/tokhr-pipe';
import { Slider } from './slider/slider';
import { Productcard } from './productcard/productcard';
import { Footer } from './footer/footer';
import { Cart } from './cart/cart';
import { Home } from "./home/home";
import { Invoice } from './invoice/invoice';
import { ContactUs } from './contact-us/contact-us';
import { CartService } from './service/cart-service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './service/product-service';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetail } from './product-detail/product-detail';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    TokhrPipe,
    Slider,
    Productcard,
    JsonPipe,
    Footer,
    Cart,
    Home,
    Invoice,
    ContactUs,
    FormsModule,
    HttpClientModule,
    ProductDetail
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title: string = 'SV11.12';
  cartCount: number = 0;
  isLoading: any;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartCount$.subscribe((count: number) => {
      this.cartCount = count;
    });
  }
}