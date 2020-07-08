import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckoutDialog } from './checkout/checkout-dialog.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pay with CRDB Bank';
  cart = [];
  total = 0;
  vat = 0;
  constructor(
    public dialog: MatDialog
  ) { }

  store = [
    {
      price: 59.99,
      image: null,
      name: 'Item 1',
      details: 'It\'s as cool as it sounds',
      heart: null,
    },
    {
      price: 99.99,
      image: null,
      name: 'Item 2',
      details: 'It\'s as cool as it sounds',
      heart: null,
    },
    {
      price: 19.99,
      image: null,
      name: 'Item 3',
      details: 'It\'s as cool as it sounds',
      heart: null,
    },
    {
      price: 59.99,
      image: null,
      name: 'Item 4',
      details: 'It\'s as cool as it sounds',
      heart: null,
    }
    
  ];


  addItemToCart(item) {
    this.cart.push(item);
    this.total = this.total + item.price;
    this.vat = 0.16 * this.total;
  }



  remove(item) {
    const index: number = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.total = this.total - item.price; // substract
      this.vat = 0.16 * this.total;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckoutDialog, {
      width: '550px',
      data: { total: this.total, vat: this.vat, items: this.cart }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    });
  }
}
