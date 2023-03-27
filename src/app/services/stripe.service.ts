import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StripeService {
    constructor(public http: HttpClient) {
    }

    createCustomer(email: string) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("name", email);

        return this.http.post('https://api.stripe.com/v1/customers', urlencoded, {
            headers: {
                "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
    getAllCustomer() {
        return this.http.get('https://api.stripe.com/v1/customers', {
            headers: {
                "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
    // checkout(plan) {
    //     var urlencoded = new URLSearchParams();

    //     return this.http.post('https://api.stripe.com/v1/checkout/sessions', urlencoded, {
    //         headers: {
    //             "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //     })
    // }



    createPaymentMethod() {

        var urlencoded = new URLSearchParams();
        urlencoded.append("type", "card");
        urlencoded.append("card[number]", "4242424242424242");
        urlencoded.append("card[exp_month]", "8");
        urlencoded.append("card[exp_year]", "2023");
        urlencoded.append("card[cvc]", "314");

        return this.http.post("https://api.stripe.com/v1/payment_methods", urlencoded, {
            headers: {
                "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    attachPaymentMethod(cust_id, pm_id) {

        var urlencoded = new URLSearchParams();
        urlencoded.append("customer", cust_id);

        return this.http.post(`https://api.stripe.com/v1/payment_methods/${pm_id}/attach`, urlencoded, {
            headers: {
                "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    updateCustomer(cust_id, pm_id) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("invoice_settings[default_payment_method]", pm_id);

        return this.http.post(`https://api.stripe.com/v1/customers/${cust_id}`, urlencoded, {
            headers: {
                "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    getPlan(id: string) {
        return this.http.get(`https://api.stripe.com/v1/plans/${id}`, {
            headers: {
                "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
    createSubscription(cust_id, price_id) {

        var urlencoded = new URLSearchParams();
        urlencoded.append("customer", cust_id);
        urlencoded.append("items[0][price]", price_id);

        return this.http.post("https://api.stripe.com/v1/subscriptions", urlencoded, {
            headers: {
                "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    checkout(price_id) {

        // var urlencoded = new URLSearchParams();
        // urlencoded.append("items[0][price]", price_id);
        // urlencoded.append("line_items[0][quantity]", '1');
        // urlencoded.append("mode", "subscription");
        // urlencoded.append("success_url", "https://example.com/success");


        var urlencoded = new URLSearchParams();
        urlencoded.append("success_url", "https://todopage.page.link/loginapp");
        urlencoded.append("line_items[0][price]", price_id);
        urlencoded.append("line_items[0][quantity]", "1");
        urlencoded.append("mode", "subscription");


        return this.http.post('https://api.stripe.com/v1/checkout/sessions', urlencoded, {
            headers: {
                "Authorization": "Bearer sk_test_51MjmwqSJpfM5g6nohdAZNMlGALcBqm5qwztPCASQ2kfZMDNmsDTfcAaI4BfxjZvxhR0MnuDhwkLwVozYmwb8qtXK0065U8Z4zh",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }

}


// Create plan
// Get plan & display
// Create payment method
// Create customer => param => default_pay_method
// Create subscription => param => price_id from plan & cust_id