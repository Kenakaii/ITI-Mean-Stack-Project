import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesStuffService } from '../movies-stuff.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit
{
  file='../../assets/';
  viewedMovie:any;
  viewedMovieID:any='';

  constructor(public Route:ActivatedRoute, public MovieService:MoviesStuffService)
  {

  }
  
  ngOnInit(): void {
    this.viewedMovieID = parseInt(this.Route.snapshot.paramMap.get('id')!);
    this.MovieService.getMovieByID(this.viewedMovieID).subscribe({
      next:(apiData)=>
      {
        this.viewedMovie=apiData;
      }
    });
  }
}
