import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';

// ✅ popup global
import { AdPopup, PopupAd } from './shared/ad-popup/ad-popup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, AdPopup],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Rillette');

  // ✅ POPUPS (toutes les 20s)
  popups: PopupAd[] = [
    { imageSrc: 'assets/popups/popup1.jpg', alt: 'Pub popup 1', url: 'https://zoomquilt.org/' },
    { imageSrc: 'assets/popups/popup2.jpg', alt: 'Pub popup 2', url: 'https://papertoilet.com/' },
    { imageSrc: 'assets/popups/popup3.jpg', alt: 'Pub popup 3', url: 'https://ffffidget.com/' },
  ];

  popupOpen = false;
  currentPopupIndex = 0;

  private popupIntervalId: number | null = null;

  constructor() {
    
    window.setTimeout(() => {
      this.popupOpen = true;
    }, 3000);

    
    this.popupIntervalId = window.setInterval(() => {
      this.currentPopupIndex = (this.currentPopupIndex + 1) % this.popups.length;
      this.popupOpen = true;
    }, 20000);
  }

  get currentPopup(): PopupAd {
    return this.popups[this.currentPopupIndex];
  }

  closePopup() {
    this.popupOpen = false;
  }
}
