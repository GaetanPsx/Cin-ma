import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { ToastrService } from 'ngx-toastr';

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
  private readonly toastr = inject(ToastrService); 

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date().toISOString().slice(0, 10),
    synopsis: '',
  };

  addMovie(): void {
    this.moviesApi.addMovie(this.movie).subscribe({
      next: () => {
        this.toastr.success('Film ajouté ', 'Succès'); 
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.toastr.error('Erreur lors de l’ajout du film', 'Erreur'); 
            },
    });
  }
}
