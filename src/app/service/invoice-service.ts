// invoice-service.ts
// src/app/service/invoice-service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoiceItems: any[] = [];

  setInvoiceItems(items: any[]) {
    this.invoiceItems = items;
  }

  getInvoiceItems(): any[] {
    return this.invoiceItems;
  }

  clearInvoiceItems() {
    this.invoiceItems = [];
  }
}