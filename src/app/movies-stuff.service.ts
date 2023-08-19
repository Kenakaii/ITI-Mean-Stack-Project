import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from './products/IMovie';

@Injectable({
  providedIn: 'root'
})
//https://api.themoviedb.org/3/movie/now_playing?api_key=998d6810a64cc4e10195a6406575f8c3
export class MoviesStuffService {

  api_key:string="998d6810a64cc4e10195a6406575f8c3";
  url="http://localhost:3000";

  constructor(public http:HttpClient) { }

  getAllMovies(currentPage:number, pageSize:number):Observable<{moviesData:IMovie[], totalMovies:number}>
  {
    return this.http.get<{moviesData:IMovie[], totalMovies:number}>(`${this.url}/products?currentPage=${currentPage}&pageSize=${pageSize}`);
  }

  getMovieByID(MovieID:number):Observable<IMovie>
  {
    return this.http.get<IMovie>(`${this.url}/products/${MovieID}`);
  }
}
