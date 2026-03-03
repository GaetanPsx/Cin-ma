import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Ad = {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaUrl: string;
  imageSrc: string; // ex: 'assets/ads/revolut.jpg'
  alt: string;
  badge?: string;   // ex: 'Sponsorisé'
};

@Component({
  selector: 'app-ads-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ads-banner.html',
  styleUrl: './ads-banner.scss',
})
export class AdsBanner {
  @Input({ required: true }) ads: Ad[] = [];
}
