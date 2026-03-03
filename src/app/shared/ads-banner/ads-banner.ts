import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Ad = {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaUrl: string;
  imageSrc: string; 
  alt: string;
  badge?: string;   
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
