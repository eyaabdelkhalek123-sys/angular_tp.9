import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';


@Component({
  selector: 'app-films',
  imports: [CommonModule,RouterLink],
  templateUrl: './films.html',
  styleUrl: './films.css'
})
export class Films implements OnInit {

  films : Film[]; //le tableau de films 

  constructor(private filmService : FilmService,
              public authService: Auth)
  {
      this.films = filmService.listeFilm();
  }

  supprimerFilm(f: Film) 
  { 
    //console.log(f); 
    let conf = confirm("Etes-vous sûr ?"); 
      if (conf) 
        this.filmService.supprimerFilm(f);
   } 

  ngOnInit(): void {
    
  }
}