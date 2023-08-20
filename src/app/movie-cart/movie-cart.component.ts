import { Component, OnInit } from '@angular/core';
import { MoviesStuffService } from '../movies-stuff.service';
import { IMovie } from '../products/IMovie';

@Component({
  selector: 'app-movie-cart',
  templateUrl: './movie-cart.component.html',
  styleUrls: ['./movie-cart.component.css']
})
export class MovieCartComponent
{
  file='../../assets/';
  cartData:any;
  totalprice:number=0;
  constructor(public MovieService:MoviesStuffService){}

  ngOnInit(): void
  {
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
      }
    })
  }

}
