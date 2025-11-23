import { Routes } from '@angular/router';
import { Films } from './films/films';
import { AddFilm } from './add-film/add-film';
import { UpdateFilm } from './update-film/update-film';
import { RechercheParGenre } from './recherche-par-genre/recherche-par-genre';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Register } from './register/register';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { filmGuard } from './film-guard';
import { ListeGenres } from './liste-genres/liste-genres';

export const routes: Routes = [

    {path: "films", component : Films},
    {path: "add-film", component : AddFilm ,  canActivate:[filmGuard]},
    {path: "update-film/:id", component : UpdateFilm},
    {path: "rechercheParGenre", component : RechercheParGenre},
    {path: "rechercheParNom", component : RechercheParNom},
    {path: "register", component : Register}, 
    {path: "login", component : Login }, 
    {path:  "app-forbidden", component : Forbidden}, 
    {path: "listeGenres", component : ListeGenres}, 
    {path: "", redirectTo : "films" , pathMatch : "full"},  //direction vers films par defaut 

];

