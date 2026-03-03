import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MoviesApi } from '../services/movies-api';
import { MovieCard } from './movie-card/movie-card';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
type SortMode = 'rating-desc' | 'rating-asc';

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

  private readonly search$ = new BehaviorSubject<string>('');
  private readonly sort$ = new BehaviorSubject<SortMode>('rating-desc');
  onSort(value: string) {
  this.sort$.next(value as SortMode);
  }
  filteredMovies$ = combineLatest([this.movies$, this.search$, this.sort$]).pipe(
  map(([movies, search, sort]) => {

    const q = search.trim().toLowerCase();

    let result = !q ? movies : movies.filter(m => {
      const title = (m.title ?? '').toLowerCase();
      const director = (m.director ?? '').toLowerCase();
      return title.includes(q) || director.includes(q);
    })

    result = [...result].sort((a, b) => {
      const ra = a.rate ?? 0;
      const rb = b.rate ?? 0;
      return sort === 'rating-asc' ? ra - rb : rb - ra;
    });

    return result;
  })
);

  onSearch(value: string) {
    this.search$.next(value);
  }

  scrollToContent() {
    document.getElementById('home-content')?.scrollIntoView({ behavior: 'smooth' });
  }
}
