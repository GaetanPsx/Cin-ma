import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { MoviesApi } from '../services/movies-api';
import { MovieCard } from './movie-card/movie-card';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi);

  // Liste complète
  movies$ = this.moviesApi.getMovies();

  // Recherche (source)
  private readonly search$ = new BehaviorSubject<string>('');

  // Liste filtrée (ce que tu affiches)
  filteredMovies$ = combineLatest([this.movies$, this.search$]).pipe(
    map(([movies, search]) => {
      const q = search.trim().toLowerCase();
      if (!q) return movies;

      return movies.filter((m) => {
        const title = (m.title ?? '').toLowerCase();
        const director = (m.director ?? '').toLowerCase();
        return title.includes(q) || director.includes(q);
      });
    })
  );

  onSearch(value: string) {
    this.search$.next(value);
  }

  scrollToContent() {
    document.getElementById('home-content')?.scrollIntoView({ behavior: 'smooth' });
  }
}
