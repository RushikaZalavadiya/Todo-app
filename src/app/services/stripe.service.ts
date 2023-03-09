import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StripeService {
    constructor(public http: HttpClient) { }

    createCustomer() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic pk_test_51MjmwqSJpfM5g6noZSp89jtTTx5neVS89p9ZBRbMPMIZO1P2PXXWkCi1iSXSwT6fA6mBwlrzLR1Dfy8LpMvuGzuJ00BZL8DdV3");
        return this.http.post('https://api.stripe.com/v1/customers', myHeaders);
    }
}