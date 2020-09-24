import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Movie, Pagination } from "../../models/Movie";
import { ApiService} from "../../api.service";
import {any} from "codelyzer/util/function";
import { ActivatedRoute, Router } from "@angular/router";
import {range} from "rxjs/internal/observable/range";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  page: number;
  movies: any = [];
  pages: any[];
  @Output() newMovies = new EventEmitter<Movie[]>();

  constructor(private apiService: ApiService) { }



  ngOnInit(): void {
  };

  pagintaonMovie(newMovies: Movie[]) {
    this.newMovies.emit(newMovies);
  }

  getPagination(page: number) {
    console.log(this.page);
    this.apiService.pagination(this.page).subscribe(
      data => {
          this.movies = data['results'];
          console.log(this.movies);
          console.log(data['count']/this.movies.length);
          this.pages=[1, 2, 3, 4];
          this.pagintaonMovie(this.movies);
        },
        error => console.log(error)
      );
  }






}
