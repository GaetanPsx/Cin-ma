import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PopupAd = {
  imageSrc: string; 
  alt: string;
  url: string;      
};

@Component({
  selector: 'app-ad-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-popup.html',
  styleUrl: './ad-popup.scss',
})
export class AdPopup {
  @Input({ required: true }) ad!: PopupAd;
  @Input() open = false;

  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
