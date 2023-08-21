import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from './products/IMovie';

@Injectable({
  providedIn: 'root'
})

export class MoviesStuffService
{
  url="http://localhost:3000";

  constructor(public http:HttpClient) { }

  getAllMovies(currentPage:number, pageSize:number):Observable<{moviesData:IMovie[], totalMovies:number}>
  {
    return this.http.get<{moviesData:IMovie[], totalMovies:number}>(`${this.url}/Movies/getAllMovies?currentPage=${currentPage}&pageSize=${pageSize}`);
  }

  getMovieByID(MovieID:number):Observable<IMovie>
  {
    return this.http.get<IMovie>(`${this.url}/Movies/getMovie/${MovieID}`);
  }

  getCart():Observable<any>
  {    
    return this.http.get<any>(`${this.url}/Users/getCart`);
  }

  addtoCart(movie:IMovie):Observable<any>
  {
    console.log(movie);
    return this.http.post(`${this.url}/Users/addtoCart`, {movieId:movie._id});
  }

  addOrder(cartitems:any[], totalprice:number):Observable<any>
  {
    return this.http.post(`${this.url}/Users/addOrder`, {cartitems, totalprice});
  }

  getOrders():Observable<any>
  {
    return this.http.get(`${this.url}/Users/getOrders`);
  }
}
