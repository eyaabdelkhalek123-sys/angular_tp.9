import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { FilmService } from '../services/film.service';
import { CommonModule } from '@angular/common';
import { UpdateGenre } from '../update-genre/update-genre';
import { Film } from '../model/film.model';

@Component({
  selector: 'app-liste-genres',
  imports: [CommonModule , UpdateGenre],
  templateUrl: './liste-genres.html',
  styles: ``
})
export class ListeGenres implements OnInit { 

  genres! : Genre[]; 

  updatedGen:Genre = {"idgen":0,"nomgen":""};

  ajout: boolean = true;

  constructor(private filmService : FilmService) { } 

  ngOnInit(): void {
  this.genres = this.filmService.listeGenres();
  console.log(this.genres);
  } 

  genreUpdated(genre: Genre) {
    this.filmService.ajouterGenre(genre);
    this.genres = this.filmService.listeGenres();
  }

  updateGen(gen:Genre) { 
    this.updatedGen=gen; 
    this.ajout = false;
  }

}
