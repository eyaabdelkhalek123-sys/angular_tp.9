import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Genre } from '../model/genre.model';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-recherche-par-genre',
  imports: [CommonModule, DatePipe,FormsModule,RouterLink],
  templateUrl: './recherche-par-genre.html',
  styles: ``
})
export class RechercheParGenre implements OnInit{

  films! :Film[];
  genres! : Genre[];
  IdGenre! : number;

  constructor(private filmService : FilmService,
              public authService : Auth,
              private router : Router
  ){}

  ngOnInit(): void {
    this.genres = this.filmService.listeGenres();
    this.films = this.filmService.listeFilm();
  }

  onChange()
  {
    console.log(this.IdGenre);
    this.films = this.filmService.rechercheParGenre(this.IdGenre);
  }

  supprimerFilm(f: Film) 
  { 
    console.log(f); 
    let conf = confirm("Etes-vous sûr ?"); 
      if (conf) 
        this.filmService.supprimerFilm(f);
        this.films = this.filmService.rechercheParGenre(this.IdGenre); //pour actualiser le tab automatiquement
        this.router.navigate(['films']);
   } 

   updateFilm( fil: Film) 
    { 
      const index = this.films.indexOf(fil, 0); //on cherche la position de film a modifier
      if (index > -1) 
      { 
        this.films.splice(index, 1); //on supprime le film 
        this.films.splice(index,0,fil); //on inserer le new film
      } 
      this.router.navigate(['films']);
    } 

}
