import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../search-filter-pipe';
import { Genre } from '../model/genre.model';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [CommonModule, FormsModule, DatePipe, SearchFilterPipe,RouterLink],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit
{
  genres! : Genre[];
  IdGenre! : number;

  nomFilm! : string; 
  films!: Film[]; 

  allFilms! : Film[]; 
  searchTerm!: string; 

  SearchTerm! : string;
   
  constructor(private filmService : FilmService,
              public authService : Auth,
              private router : Router
  ) {} 
 
  /* ngOnInit(): void 
  {
    this.filmService.listeFilm().subscribe(fil => { 
      console.log(fil); 
      this.films = fil; 
      });
  }  */

  ngOnInit(): void {
      this.allFilms = this.filmService.listeFilm(); // récupère tous les films
  this.films = [...this.allFilms];
  }
 
  /* rechercherFilms(){ 
    this.filmService.rechercherParNom(this.nomFilm).subscribe((fil:Film[]) => { 
      console.log(fil); 
      this.films=fil;}); 
  }  */

  rechercherFilms(): void 
  {
    this.films = this.filmService.rechercherParNom(this.nomFilm);
  }

  onKeyUp(filterText : string)
  { 
    this.films = this.allFilms.filter(item => item.nom.toLowerCase().includes(filterText)); 
  } 

  supprimerFilm(f: Film) 
  { 
    console.log(f); 
    let conf = confirm("Etes-vous sûr ?"); 
      if (conf) 
        this.filmService.supprimerFilm(f);
        this.films = this.filmService.rechercheParGenre(this.IdGenre); //pour actualiser le tab automatiquement
        this.router.navigate(['films']); //pour retourner a la page films des la suppression
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
