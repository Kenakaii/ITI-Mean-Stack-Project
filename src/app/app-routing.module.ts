import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ProductsComponent } from './products/products.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MovieCartComponent } from './movie-cart/movie-cart.component';

const routes: Routes = [
  {path:'Home',component:ProductsComponent},
  {path:'Movies/:id',component:MovieDetailsComponent},
  {path:'Cart',component:MovieCartComponent},
  {path:'',component:ProductsComponent},
  {path:'**',component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
