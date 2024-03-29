import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from './Order';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public product: any = [];
  public grandTotal: number = 0;
  public addressform = false;
  aki: FormGroup | any;
  
  data: any;
  items: any;
  Order!: any;
  constructor(private cartService: CartService, private http: HttpClient,private router: Router) { }
  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.product = res;
      this.updateGrandTotal();
      this.grandTotal = this.cartService.getTotalPrice();
      console.log("total price is", this.grandTotal);
    });
    this.aki = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }
  updateGrandTotal() {
    this.grandTotal = this.cartService.getTotalPrice();
    // console.log("Total price is", this.grandTotal);
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }
  cancel() {
    this.addressform = false;
  }

  postdata() {
    const orderData = {
      name: this.aki.value.name,
      mobile: this.aki.value.mobile,
      address: this.aki.value.address,
      items: this.product.map((item: any) => {
        return {
          name: item.name,
          price: item.price,
          milk: item.milk,
          state: item.state,
          image: item.image
        };
      })
    };

    this.http.post("https://6529ee5555b137ddc83f33c3.mockapi.io/info", orderData)
      .subscribe((res: any) => {
        console.log(orderData);
        alert("Order Successfully");
        this.router.navigate(['/order-page']);
      });
  }
  

}





