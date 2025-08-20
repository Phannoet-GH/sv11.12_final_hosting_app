// productcard.ts
// productcard.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokhrPipe } from "../custom-pipe/tokhr-pipe";
import { CashKhrPipe } from "../cash-khr-pipe";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [CommonModule, TokhrPipe, CashKhrPipe, RouterLink],
  templateUrl: './productcard.html',
  styleUrls: ['./productcard.css']
})
export class Productcard {
  @Input() product: any;
  @Output() OnAddCart = new EventEmitter<any>();
  onAddToCartClick() {
    this.OnAddCart.emit(this.product);
  }
}