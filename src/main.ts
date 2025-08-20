// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { App } from './app/app';
import { Home } from './app/home/home';
import { Cart } from './app/cart/cart';
import { ProductDetail } from './app/product-detail/product-detail'; // Import the new component
import { ProductService } from './app/service/product-service';
import { CartService } from './app/service/cart-service';
import { ContactUs } from './app/contact-us/contact-us';
import { Invoice } from './app/invoice/invoice';
import { InvoiceService } from './app/service/invoice-service';
import { LoadingService } from './app/service/loading-service';
import { ProductList } from './app/product-list/product-list'; // Import the new component

const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'cart', component: Cart },
  { path: 'invoice', component: Invoice },
  { path: 'products', component: ProductList },
  { path: 'contact-us', component: ContactUs },
  { path: 'product-detail/:id', component: ProductDetail },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    ProductService,
    CartService,
    InvoiceService,
    LoadingService
  ]
}).catch(err => console.error(err));