import { Component, OnInit } from '@angular/core';
import { MoviesStuffService } from '../movies-stuff.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent
{
  file='../../assets/';
  dataLoaded:boolean = false;
  userOrders!:any;

  constructor(public MovieService:MoviesStuffService){}

  ngOnInit(): void
  {
    this.dataLoaded = false;
    this.MovieService.getOrders().subscribe({
      next:(apiData)=>
      {
        console.log(apiData);
        this.userOrders = apiData;
      }
    });
    this.dataLoaded = true;
  }
}
