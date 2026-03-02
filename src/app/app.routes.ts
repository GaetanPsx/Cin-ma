import { AddMovie } from './add-movie/add-movie';
import { MoviesList } from './movies-list/movies-list';
import { Home } from './home/home';
import { Routes } from '@angular/router';
import { EditMovie } from './edit-movie/edit-movie';
import { Contact } from './contact/contact';
import { Faq } from './faq/faq';
import { APropos } from './a-propos/a-propos';
import { Confidentialite } from './confidentialite/confidentialite';
import { MentionsLegales } from './mentions-legales/mentions-legales';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movies', component: MoviesList },
  { path: 'add-movie', component: AddMovie }, 
  { path: 'edit-movie/:id', component: EditMovie },
  { path: 'contact', component: Contact },
  { path: 'faq', component: Faq },
  { path: 'a-propos', component: APropos },
  { path: 'mentions-legales', component: MentionsLegales },
  { path: 'confidentialite', component: Confidentialite }
];