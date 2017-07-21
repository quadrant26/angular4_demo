import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app.router";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { Code404Component } from './code404/code404.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {ProductService} from "./shared/product.service";
import {ReactiveFormsModule} from "@angular/forms";
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ProductComponent,
    StarsComponent,
    CarouselComponent,
    FooterComponent,
    HomeComponent,
    Code404Component,
    ProductDetailComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
