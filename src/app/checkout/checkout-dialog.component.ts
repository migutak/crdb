import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


export interface DialogData {
    total: number;
    vat: number;
    items: Array<any>;
};

@Component({
    selector: 'checkout-dialog',
    templateUrl: './checkout-dialog.component.html'
})
export class CheckoutDialog {
    accnumber = new FormControl('', [Validators.required]);
    loader: boolean = false;

    subTot = 0;
    tax = 0;
    items: Array<any>;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private http: HttpClient) {
        this.subTot = data.total;
        this.tax = data.vat;
        this.items = data.items;
    }

    completeOrder() {
        var body = {
            accnumber: this.accnumber.value,
            total: this.subTot
        }
        this.loader = true;

        const headers = { 'Authorization': 'Bearer ' + environment.auth, 'X-IBM-Client-Id': environment.clientid, 'X-IBM-Client-Secret': environment.clientsecret }

        this.http.post(environment.api, body, { headers }).subscribe(data => {
            console.log(data);
            this.loader = false;
        }, error => {
            console.log(error);
            this.loader = false;
        })
    }

    getErrorMessage() {
        if (this.accnumber.hasError('required')) {
            return 'You must enter a value';
        }
    }
}