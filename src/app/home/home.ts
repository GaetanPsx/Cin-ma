import { Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { MovieCard } from './movie-card/movie-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi);


  movies$ = this.moviesApi.getMovies();


  search = signal('');


  filteredMovies = (movies: Movie[] | null): Movie[] => {
    const q = this.search().trim().toLowerCase();
    if (!movies) return [];
    if (!q) return movies;

    return movies.filter((m) =>
      (m.title ?? '').toLowerCase().includes(q) ||
      (m.director ?? '').toLowerCase().includes(q)
    );
  };
}