import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ProductsComponent } from './products/products.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MovieCartComponent } from './movie-cart/movie-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Movies',component:ProductsComponent},
  {path:'Movies/:id',component:MovieDetailsComponent},
  {path:'Cart',component:MovieCartComponent},
  {path:'Orders',component:OrdersComponent},
  {path:'Sign-up',component:SignupFormComponent},
  {path:'Log-in',component:LoginFormComponent},
  {path:'',component:HomeComponent},
  {path:'**',component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
