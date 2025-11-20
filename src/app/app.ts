import { Component, OnInit, signal } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('MyCinema');

  constructor (public authService: Auth , 
    private router : Router
  ) {} 


  ngOnInit () { 
  let isloggedin: string; 
  let loggedUser:string; 
  
  isloggedin = localStorage.getItem('isloggedIn') !; 
  loggedUser = localStorage.getItem('loggedUser') !; 
  if (isloggedin!="true" || !loggedUser) 
      this.router.navigate(['/login']); 
  else 
   this.authService.setLoggedUserFromLocalStorage(loggedUser); 
} 

  onLogout()
  { 
    this.authService.logout(); 
  }

}
