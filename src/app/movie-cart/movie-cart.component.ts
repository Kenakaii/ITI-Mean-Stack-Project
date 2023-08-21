import { Component, OnInit } from '@angular/core';
import { MoviesStuffService } from '../movies-stuff.service';
import { IMovie } from '../products/IMovie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-cart',
  templateUrl: './movie-cart.component.html',
  styleUrls: ['./movie-cart.component.css']
})
export class MovieCartComponent
{
  dataLoaded:boolean = false;
  file='../../assets/';
  cartData:any;
  totalprice:number=0;
  constructor(public MovieService:MoviesStuffService, private router:Router){}

  ngOnInit(): void
  {
    this.dataLoaded = false;
    this.MovieService.getCart().subscribe({
      next:(apiData)=>
      {
        this.cartData=apiData;
        this.totalprice=0;
        for(let cartitem of this.cartData)
        {
          this.totalprice += cartitem.movieInfo.price * cartitem.quantity;
        }
        console.log(this.cartData);
        this.dataLoaded = true;
      }
    })
  }

  checkCart()
  {
    if(this.cartData.length)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  addOrder()
  {
    this.MovieService.addOrder(this.cartData, this.totalprice).subscribe({
      next:(apiData)=>
      {
        console.log(apiData);
      }
    });
    this.router.navigate(['/Orders']);
  }
}
