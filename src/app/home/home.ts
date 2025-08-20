// home.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productcard } from '../productcard/productcard';
import { Slider } from "../slider/slider";
import { ProductService } from '../service/product-service';
import { CartService } from '../service/cart-service';
import { LoadingService } from '../service/loading-service'; // Import the service
import { Footer } from '../footer/footer'; // Import Footer

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Productcard, Slider, Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  providers: [LoadingService] // Provide the service at the component level
})
export class Home implements OnInit {
  products: any[] = [];
  isLoading: boolean = false; // Add a property to track loading state

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private loadingService: LoadingService // Inject the service
  ) { }

  ngOnInit() {
    // Subscribe to the loading service to update the loading state
    this.loadingService.loading$.subscribe((state: boolean) => {
      this.isLoading = state;
    });

    // Use the loading service to show the loading indicator before the request
    this.loadingService.show();
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.loadingService.hide(); // Hide after the data is loaded
    });
  }

  handleAddToCart(product: any) {
    this.cartService.addToCart(product);
  }

  trackById(index: number, item: any): any {
    return item.id;
  }
}