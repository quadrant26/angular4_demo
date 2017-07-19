import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Product, ProductService, Comment} from "../shared/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  //productTitle: string;
  product: Product;
  comments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    //this.productTitle = this.route.snapshot.params["prodTitle"];
    let productId: number =  this.route.snapshot.params['productId'];

    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getCommentForProductId(productId);

    console.log(this.comments);

  }

}
