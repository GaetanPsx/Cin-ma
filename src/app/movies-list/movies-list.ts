import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList {
  private readonly moviesApi = inject(MoviesApi);

  movies$ = this.moviesApi.getMovies();

  deleteMovie(id: number): void {
    this.moviesApi.deleteMovie(id).subscribe(() => {
      // recharge la liste après suppression
      this.movies$ = this.moviesApi.getMovies();
    });
  }
}