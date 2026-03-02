import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { MoviesApi } from '../services/movies-api';
import { MovieCard } from './movie-card/movie-card';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi);

  movies$ = this.moviesApi.getMovies();

  scrollToContent() {
    document.getElementById('home-content')?.scrollIntoView({ behavior: 'smooth' });
  }
}
