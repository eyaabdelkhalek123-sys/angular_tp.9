import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../model/film.model';
import { CommonModule } from '@angular/common';
import { Genre } from '../model/genre.model';
import {FormBuilder , FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-film',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl:'./update-film.html',
  styles: ``
})
export class UpdateFilm implements OnInit{

  currentFilm = new Film();

  genres! : Genre[];
  updateGenId! : number;

  myForm!: FormGroup; 

  constructor(private activatedRoute: ActivatedRoute, 
              private router : Router, 
              private filmService: FilmService,
            private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    
    this.genres= this.filmService.listeGenres();
    this.currentFilm = this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id']); 
    this.updateGenId=this.currentFilm.genre.idgen;

    console.log(this.activatedRoute.snapshot.params['id']);
    console.log(this.currentFilm);

    const date=new Date(this.currentFilm.datesortie);
    const newDate=date.toLocaleDateString('en-CA'); //pour ne pas avoir un problem avec "TimeZone"
    
    this.myForm = this.formBuilder.group({
      id : [this.currentFilm.id, [Validators.required]],
      nom : [this.currentFilm.nom, [Validators.required]],
      genreId : [this.currentFilm.genre.idgen, [Validators.required]],
      datesortie : [newDate, [Validators.required]],
      rating : [this.currentFilm.rating, [Validators.max(10)]],
      email : [this.currentFilm.email, [Validators.required , Validators.email]],
    });
  }

  /* updateFilm()
  {
    
    this.currentFilm.genre= this.filmService.consulterGenre(this.updateGenId)
    this.filmService.updateFilm(this.currentFilm); 
    this.router.navigate(['films']);

    console.log(this.currentFilm);
  } */

  updateFilm() 
  {
    const formValues = this.myForm.value;

    this.currentFilm.id = formValues.id;
    this.currentFilm.nom = formValues.nom;
    this.currentFilm.datesortie = formValues.datesortie;
    this.currentFilm.rating = formValues.rating;
    this.currentFilm.email = formValues.email;
    this.currentFilm.genre = this.filmService.consulterGenre(formValues.genreId);

    this.filmService.updateFilm(this.currentFilm); 
    this.router.navigate(['films']);

    console.log(this.currentFilm);
  }

}