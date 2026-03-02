import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss'],
})
export class Faq {
  feedbackMessage: string | null = null;

  answer(isPositive: boolean) {
    this.feedbackMessage = isPositive
      ? 'Merci pour votre retour ! '
      : "D'accord — contactez-nous et on vous aide ";
  }
}