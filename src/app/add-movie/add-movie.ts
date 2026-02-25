import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.scss',
})
export class AddMovie {
  private readonly moviesApi = inject(MoviesApi);
  private readonly router = inject(Router);

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD pour input type="date"
    synopsis: '',
    // id/rate/image sont optionnels dans ton interface -> pas besoin de les mettre
  };

  addMovie(): void {
    this.moviesApi.addMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
}