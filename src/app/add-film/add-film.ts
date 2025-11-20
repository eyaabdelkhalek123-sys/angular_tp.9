import { Component , OnInit} from '@angular/core';
import {FormBuilder , FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
import { Route, Router } from '@angular/router';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-add-film',
  imports: [ReactiveFormsModule , FormsModule],
  templateUrl: './add-film.html',
  styleUrl: './add-film.css'
})
export class AddFilm  implements OnInit
{
  //newFilm! : Film; 
  newFilm = new Film(); 

  genres! : Genre[];
  newIdgenre! :number;
  newGenre! : Genre;

  myForm!: FormGroup; 

  constructor(private filmService : FilmService,
              private router : Router ,
            private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.genres = this.filmService.listeGenres();

    this.myForm = this.formBuilder.group({

      id : ['',[Validators.required]],
      nom : ['',[Validators.required]],
      genreId : [null,[Validators.required]],
      datesortie : ['',[Validators.required]],
      rating : ['',[Validators.max(10)]],
      email :['',[Validators.required , Validators.email]],
    });
  }

  /* addFilm() //old version
  {
    const id = this.myForm.value.genreId;
    this.newFilm.genre = this.filmService.consulterGenre(id);


    this.newGenre = this.filmService.consulterGenre(this.newIdgenre);
     this.newFilm.genre = this.newGenre; 
    this.filmService.ajouterFilm(this.newFilm); 
    //this.message="le film "+this.newFilm.nom+" a été ajouté a votre TUDUM-LIST";
    this.router.navigate(['films']);

    console.log(this.newFilm); 
  } */

  addFilm() 
  {
    const formValues = this.myForm.value;

    this.newFilm= 
    {
      id: formValues.id,
      nom: formValues.nom,
      datesortie: formValues.datesortie,
      rating: formValues.rating,
      email: formValues.email,
      genre: this.filmService.consulterGenre(formValues.genreId)
    };

    this.filmService.ajouterFilm(this.newFilm);
    this.router.navigate(['films']);
    console.log(this.newFilm);
}

}