import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  products: Product[] = [
    new Product(1, '第一个商品', 899, 3.5, '这是一个垃圾电脑', ['电子产品', '家电']),
    new Product(2, '第二个商品', 899, 3.5, '这是一个垃圾电脑', ['电子产品', '家电']),
    new Product(3, '第三个商品', 899, 3.5, '这是一个垃圾电脑', ['电子产品', '硬件设备']),
    new Product(4, '第四个商品', 899, 3.5, '这是一个垃圾电脑', ['硬件设备', '家电']),
    new Product(5, '第五个商品', 899, 3.5, '这是一个垃圾电脑', ['电子产品', '家电']),
    new Product(6, '第六个商品', 899, 3.5, '这是一个垃圾电脑', ['图书', '家电'])
  ]

  constructor() { }

  getAllCategories(): string[]{
    return ["电子产品", "硬件设备", "图书"];
  }

  private comments: Comment[] = [
    new Comment(1, 1, "2017-07-01 17:43:04", "张三", 3, "东西不错"),
    new Comment(2, 1, "2017-07-12 17:43:04", "离思", 2, "东西不错"),
    new Comment(3, 2, "2017-07-19 17:43:04", "王五", 4, "东西不错"),
    new Comment(4, 3, "2017-07-08 17:43:04", "李斯", 5, "东西不错"),
    new Comment(5, 1, "2017-07-12 17:43:04", "赵六", 2, "东西不错"),
    new Comment(6, 1, "2017-07-11 17:43:04", "混账", 3, "东西不错"),
  ];

  getProducts (): Product[]{
    return this.products;
  }

  getProduct (id: number): Product{
    return this.products.find( product => product.id == id)
  }

  getCommentForProductId(id:number): Comment[]{
    return this.comments.filter( (comment : Comment) => comment.productId == id);
  }
}

export class Product{
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ){

  }
}

export class Comment{
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ){

  }
}
