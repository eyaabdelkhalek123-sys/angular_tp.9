import { Injectable } from '@angular/core';
import { Film } from '../model/film.model';
import { Genre } from '../model/genre.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  films! : Film[]; //un tableau de films
  genres! : Genre[];
  filmsRecherche! : Film[];

  constructor()
  {
    this.genres = [
      {idgen : 1 , nomgen : "Rom-Com"},
      {idgen : 2 , nomgen : "Satire"},
      {idgen : 3 , nomgen : "Horreur"},
      {idgen : 4 , nomgen : "Docufiction"},
      {idgen : 5 , nomgen : "Thriller"},
      {idgen : 6 , nomgen : "Drame"},
      {idgen : 7 , nomgen : "Sci-fi"},
      {idgen : 8 , nomgen : "Survie"},
      {idgen : 9 , nomgen : "Action"},
      {idgen : 10 , nomgen : "Fantastique"},
      
    ]

    this.films=[
      {id: 33 , nom: "7. Koğuştaki Mucize" , genre: { idgen: 6, nomgen: "Drame" } , datesortie: new Date("11/10/2019") , rating: 8.0 , email: "info@o3turkeymedya.com"},
      {id:393 , nom:"Train to Busan", genre: {idgen: 8 , nomgen:"Survie"}, datesortie:new Date("07/20/2016"), rating:7.6, email:"contact@traintobusan.com"},
      {id: 1, nom: "Nanny McPhee", genre:{ idgen : 10, nomgen : "Fantastique"} , datesortie:new Date("12/09/2005"), rating: 7.3 , email:"contact@nannymcphee.com"},
      {id : 143 , nom : "Tuk-Tuk" , genre : { idgen: 6, nomgen: "Drame" } , datesortie : new Date("03/20/2019") , rating : 7 , email : "contact@yehiaelghareeb.com"},
      {id : 20 , nom : "20st Century Girl" , genre : {idgen : 1 , nomgen : "Rom-Com"} , datesortie : new Date("10/02/2022") , rating : 7.4 , email : "YONGFILM@gmail.com"},
      {id:2, nom:"Home Alone", genre:{idgen:2, nomgen:"Comedy/Family"}, datesortie:new Date("11/16/1990"), rating:7.6, email:"contact@homealone.com"},
      {id : 7 , nom : "The Voice of Hind Rajab" , genre : {idgen : 4 , nomgen : "Docufiction"} , datesortie : new Date("09/05/2025") , rating : 8.1 , email : "heydayFilms@gmail.com"},
      {id : 3 , nom : "The Conjuring" , genre : {idgen : 3 , nomgen : "Horreur"} , datesortie : new Date("07/19/2013") , rating : 6.8 , email : "thesafran_company@gmail.com"},
      {id : 212 , nom : "The Platform" , genre : {idgen : 5 , nomgen : "Thriller"} , datesortie : new Date("03/20/2019") , rating : 7 , email : "basqueFilms@gmail.com"},
      {id: 40 , nom: "Black Panther:Wakanda Forever" , genre: { idgen: 9, nomgen: "Action" } , datesortie: new Date("11/11/2022") , rating: 7.2 , email: "contact@marvel.com"},
      {id: 19 , nom: "Avatar 2:The Way of Water" , genre: { idgen: 7,nomgen: "Sci-fi"} , datesortie: new Date("12/16/2022") , rating: 7.8 , email: "20thcenturystudios.com"},
      
      
    ];
  }

  listeFilm():Film[] { 
      return this.films; 
  } 

   ajouterFilm( prod: Film){ 
      this.films.push(prod); 
  } 

   supprimerFilm( fil: Film) //on cherche la position et on supprime avec slice 
   { 
    const index = this.films.indexOf(fil, 0); 
      if (index > -1) { 
        this.films.splice(index, 1); 
      } 
      //ou Bien 
      /*  this.films.forEach((cur, index) => { 
         if(fil.nom === cur.nom) { 
               this.films.splice(index, 1);   
            } 
      }); */ 
    }

    consulterFilm(id:number): Film
    {     
      return this.films.find(f => f.id == id)!; 
    } 

    updateFilm( fil: Film) 
    { 
      const index = this.films.indexOf(fil, 0); //on cherche la position de film a modifier
      if (index > -1) 
      { 
        this.films.splice(index, 1); //on supprime le film 
        this.films.splice(index,0,fil); //on inserer le new film
      } 
    } 

    listeGenres():Genre[] 
    { 
      return this.genres; 
    } 

    consulterGenre(id:number): Genre
    {     
      return this.genres.find(gen => gen.idgen  == id)!; 
    } 

    rechercheParGenre(idgen : number) : Film[]
    {
      this.filmsRecherche = [];
      this.films.forEach((cur,index) => 
        {
          if (idgen == cur.genre.idgen)
          {
            console.log("cur "+cur);
            this.filmsRecherche.push(cur);
          }
        });
        return this.filmsRecherche;
    }

    rechercherParNom(nom: string): Film[] 
    {
      return this.films.filter(f => f.nom.toLowerCase().includes(nom.toLowerCase()));
    } 

    ajouterGenre(genre: Genre): Genre[] {
      const existe = this.genres.some(g => g.idgen === genre.idgen);
      if (!existe) {
        this.genres.push(genre);
      }
      return this.genres;
    }
}