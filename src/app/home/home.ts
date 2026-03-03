import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { MoviesApi } from '../services/movies-api';
import { MovieCard } from './movie-card/movie-card';
import { OnDestroy } from '@angular/core';
import { AdPopup, PopupAd } from '../shared/ad-popup/ad-popup';

// ✅ ajout : composant pub + type Ad
import { AdsBanner, Ad } from '../shared/ads-banner/ads-banner';

@Component({
  selector: 'app-home',
  standalone: true,
  
  imports: [RouterLink, AsyncPipe, MovieCard, AdsBanner, AdPopup],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi);

  movies$ = this.moviesApi.getMovies();

  // ✅ liste des pubs (bannières)
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

  // ✅ PUB POPUP (toutes les 20 secondes)
  popups = [
    { imageSrc: 'assets/popups/popup1.jpg', alt: 'Pub popup 1', url: 'https://zoomquilt.org/' },
    { imageSrc: 'assets/popups/popup2.jpg', alt: 'Pub popup 2', url: 'https://papertoilet.com/' },
    { imageSrc: 'assets/popups/popup3.jpg', alt: 'Pub popup 3', url: 'https://ffffidget.com/' },
  ];

  popupOpen = false;
  currentPopupIndex = 0;

  private popupIntervalId: number | null = null;
  private firstPopupTimeoutId: number | null = null;

  constructor() {
    
    this.firstPopupTimeoutId = window.setTimeout(() => {
      this.popupOpen = true;
    }, 3000);

    
    this.popupIntervalId = window.setInterval(() => {
      this.currentPopupIndex = (this.currentPopupIndex + 1) % this.popups.length;
      this.popupOpen = true; 
    }, 20000);
  }

  get currentPopup() {
    return this.popups[this.currentPopupIndex];
  }

  closePopup() {
    this.popupOpen = false;
  }

 
  cleanupTimers() {
    if (this.popupIntervalId !== null) window.clearInterval(this.popupIntervalId);
    if (this.firstPopupTimeoutId !== null) window.clearTimeout(this.firstPopupTimeoutId);
  }

  scrollToContent() {
    document.getElementById('home-content')?.scrollIntoView({ behavior: 'smooth' });
  }
}
