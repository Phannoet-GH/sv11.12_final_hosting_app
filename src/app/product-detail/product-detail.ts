// src/app/product-detail/product-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../service/product-service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TokhrPipe } from '../custom-pipe/tokhr-pipe';
import { CashKhrPipe } from '../cash-khr-pipe';
import { CartService } from '../service/cart-service';
import { Footer } from '../footer/footer';
import { Slider } from '../slider/slider';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TokhrPipe, CashKhrPipe, Footer, Slider],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.productService.getProductById(Number(id));
        }
        return of(null);
      })
    ).subscribe(product => {
      this.product = product;
    });
  }

  onAddToCartClick(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}