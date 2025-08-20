// src/app/invoice/invoice.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../service/invoice-service'; // Import the new service

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.html',
  styleUrls: ['./invoice.css']
})
export class Invoice implements OnInit {
  invoiceItems: any[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceItems = this.invoiceService.getInvoiceItems();
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subtotal = this.invoiceItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    this.tax = this.subtotal * 0.00; // 0% tax
    this.total = this.subtotal + this.tax;
  }
}