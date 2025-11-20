import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{
  
  /* public user = new User(); 
  confirmPassword?:string; */ 
  myForm!: FormGroup; 
  
constructor(private formBuilder: FormBuilder) { }

ngOnInit(): void {
  this.myForm = this.formBuilder.group({ 
    
    username : ['', [Validators.required]], 
    email : ['', [Validators.required, Validators.email]], 
    password : ['', [Validators.required, Validators.minLength(6)]], 
    confirmPassword : ['', [Validators.required]] 
    }); 
 }

}
