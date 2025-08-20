// app.routes.ts
import { Routes } from '@angular/router';
import { Cart } from './cart/cart';
import { Home } from './home/home';
import { ProductDetail } from './product-detail/product-detail';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cart', component: Cart },
  { path: 'product-detail', component: ProductDetail }
];