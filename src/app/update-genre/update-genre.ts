import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../model/genre.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-genre',
  imports: [FormsModule , CommonModule],
  templateUrl: './update-genre.html',
  styles: ``
})
export class UpdateGenre implements OnInit {

  @Input() 
  genre! : Genre;

  @Output()  
  genreUpdated = new EventEmitter<Genre>(); 

  @Input() 
  ajout!:boolean; 

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateGenre ",this.genre); 
  }

  saveGenre() {
    this.genreUpdated.emit(this.genre);
  }
}
