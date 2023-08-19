import { Component , OnInit } from '@angular/core';
import { MoviesStuffService } from '../movies-stuff.service';
import { PageEvent } from '@angular/material/paginator';
import { IMovie } from './IMovie';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  SearchName:string="";
  file='../../assets/';
  AllMovies:IMovie[]=[];

  pageSize:number=3;
  listofpageSize=[3,6,9,12];
  totalMovies:number=0;
  currentPage:number=1;

  constructor(public MovieService:MoviesStuffService){}
  
  ngOnInit(): void
  {
    this.MovieService.getAllMovies(this.currentPage, this.pageSize).subscribe({
      next:(apiData)=>
      {
        this.AllMovies=apiData.moviesData;
        this.totalMovies=apiData.totalMovies;
        console.log(apiData);
      }
    });
  }

  changePage(page:PageEvent)
  {
    // console.log(page.pageIndex);
    this.currentPage=page.pageIndex + 1;
    this.pageSize = page.pageSize;
    this.MovieService.getAllMovies(this.currentPage, this.pageSize).subscribe({
      next:(apiData)=>
      {
        this.AllMovies=apiData.moviesData;
      }
    });
  }

  OrderMovie(name:string)
  {
    for(let movie of this.AllMovies)
    {
      if(name === movie.name)
      {
        movie.quantity--;
      }
      if(movie.quantity === 0)
      {
        movie.available = false;
      }
    }
  }

  Filter()
  {
    if(this.SearchName == "")
    {
      for(let movie of this.AllMovies)
      {
        movie.show = true;
      }
    }
    else
    {
      for(let movie of this.AllMovies)
      {
        if(movie.name.toLowerCase().match(this.SearchName.toLowerCase()))
        {
          movie.show=true;
        }
        else
        {
          movie.show=false;
          console.log(movie.show);
        }
      }
    }
  }
}
