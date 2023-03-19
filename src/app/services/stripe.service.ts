import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StripeService {
    constructor(public http: HttpClient) { }

    createCustomer(email: string) {
        let myHeaders = new HttpHeaders();
        myHeaders.append("Authorization", "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);


        return this.http.post('https://api.stripe.com/v1/customers', urlencoded, {
            headers: {
                "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}