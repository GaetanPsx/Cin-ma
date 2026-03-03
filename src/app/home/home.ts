import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MoviesApi } from '../services/movies-api';
import { MovieCard } from './movie-card/movie-card';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdsBanner, Ad } from '../shared/ads-banner/ads-banner';

type SortMode = 'rating-desc' | 'rating-asc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, MovieCard, AdsBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi);

  movies$ = this.moviesApi.getMovies();

  // ✅ tes pubs (bannières)
  ads: Ad[] = [
    {
      title: 'Revolut',
      subtitle: 'Compte & carte en quelques minutes',
      ctaText: 'Découvrir',
      ctaUrl: 'https://www.revolut.com/',
      imageSrc: 'assets/ads/revolut.jpg',
      alt: 'Publicité Revolut',
      badge: 'Sponsorisé',
    },
    {
      title: 'Evian',
      subtitle: 'Hydratation au quotidien',
      ctaText: 'Voir la gamme',
      ctaUrl: 'https://www.evian.com/',
      imageSrc: 'assets/ads/evian.jpg',
      alt: 'Publicité Evian',
      badge: 'Sponsorisé',
    },
    {
      title: 'Caterpillar',
      subtitle: 'Machines & équipements',
      ctaText: 'Explorer',
      ctaUrl: 'https://www.cat.com/',
      imageSrc: 'assets/ads/caterpillar.jpg',
      alt: 'Publicité Caterpillar',
      badge: 'Sponsorisé',
    },
  ];

  // ✅ travail des autres : recherche + tri
  private readonly search$ = new BehaviorSubject<string>('');
  private readonly sort$ = new BehaviorSubject<SortMode>('rating-desc');

  onSort(value: string) {
    this.sort$.next(value as SortMode);
  }

  onSearch(value: string) {
    this.search$.next(value);
  }

  filteredMovies$ = combineLatest([this.movies$, this.search$, this.sort$]).pipe(
    map(([movies, search, sort]) => {
      const q = search.trim().toLowerCase();

      let result = !q
        ? movies
        : movies.filter((m) => {
            const title = (m.title ?? '').toLowerCase();
            const director = (m.director ?? '').toLowerCase();
            return title.includes(q) || director.includes(q);
          });

      result = [...result].sort((a, b) => {
        const ra = a.rate ?? 0;
        const rb = b.rate ?? 0;
        return sort === 'rating-asc' ? ra - rb : rb - ra;
      });

      return result;
    })
  );

  scrollToContent() {
    document.getElementById('home-content')?.scrollIntoView({ behavior: 'smooth' });
  }
}
