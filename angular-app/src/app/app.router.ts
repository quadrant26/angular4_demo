import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { Code404Component } from "./code404/code404.component";

const routes: Routes = [
  { path : "", component : HomeComponent},
  { path : "product/:productId", component : ProductDetailComponent},
  { path : "**", component : Code404Component}
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule],
  providers : []
})

export class AppRoutingModule {
}
