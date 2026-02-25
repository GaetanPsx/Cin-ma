import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList {
  private readonly moviesApi = inject(MoviesApi);
  private readonly toastr = inject(ToastrService);

  movies$ = this.moviesApi.getMovies();

  deleteMovie(id: number): void {
    this.moviesApi.deleteMovie(id).subscribe({
      next: () => {
        this.toastr.success('Film supprimé', 'Succès');

        
        this.movies$ = this.moviesApi.getMovies();
      },
      error: () => {
        this.toastr.error(
          'Erreur lors de la suppression du film',
          'Erreur'
        );
      },
    });
  }
}