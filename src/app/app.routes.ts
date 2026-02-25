import { AddMovie } from './add-movie/add-movie';
import { MoviesList } from './movies-list/movies-list';
import { Home } from './home/home';
import { Routes } from '@angular/router';
import { EditMovie } from './edit-movie/edit-movie';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movies', component: MoviesList },
  { path: 'add-movie', component: AddMovie }, 
  { path: 'edit-movie/:id', component: EditMovie },
];