import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-movie.html',
  styleUrl: './edit-movie.scss',
})
export class EditMovie implements OnInit {
  private readonly moviesApi = inject(MoviesApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  id!: number;

  movie: Movie = {
    id: undefined,
    title: '',
    director: '',
    releaseDate: new Date().toISOString().slice(0, 10),
    synopsis: '',
    rate: undefined,
    image: undefined,
  };

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.moviesApi.getMovieById(this.id).subscribe((m) => {
      // IMPORTANT pour <input type="date">
      this.movie = {
        ...m,
        releaseDate: (m.releaseDate ?? '').slice(0, 10),
      };
    });
  }

  updateMovie(): void {
    this.moviesApi.updateMovie(this.id, this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
}