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

  newRating: number = 5;
  newComment: string = "";

  isCommentHidden:boolean = true;

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

  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toISOString(), "someone", this.newRating, this.newComment);
    this.comments.unshift(comment);

    // 重置
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;

    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;

  }

}
