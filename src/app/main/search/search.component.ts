import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from "../../models/Movie";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title = null;
  movies: any = [];
  @Output() newMovies = new EventEmitter<Movie[]>();



  constructor(private apiService: ApiService,) { }

  ngOnInit() {
  };

  searchMovie(newMovies: Movie[]) {
    this.newMovies.emit(newMovies);
  }
  searchTitle() {
    this.apiService.findByTitle(this.title).subscribe(
      data => {
          this.movies = data['results'];
          console.log(this.movies);
          this.searchMovie(this.movies);
        },
        error => console.log(error)
      );
  }


}
