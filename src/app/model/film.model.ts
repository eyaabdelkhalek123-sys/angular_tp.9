import { Genre } from "./genre.model";

export class Film 
{ //export interface Film
    id! : number;
    nom! : string;
    genre! : Genre ;
    datesortie! : Date;
    rating! : number;
    email! : String;
} 