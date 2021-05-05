import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthServiseService} from './Services/auth-servise.service';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  loginForm;
  registerForm;
  isLogged ;
  constructor(private fb: FormBuilder, private authService: AuthServiseService) {}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    });
    this.registerForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)],
      role: ['', Validators.required]
    });
    this.authService.IsLogged.subscribe(value =>  this.isLogged = value );
  }
  login(): void {
    if ( this.loginForm.valid){
      const value = this.loginForm.value;
      this.authService.login(value.email, value.password);
      this.loginForm.reset();
    }
  }
  register(): void {
    if (this.registerForm.valid){
      const value = this.registerForm.value;
      this.authService.register(value.email, value.password, value.role);
      this.registerForm.reset();
    }
  }
  signOut(): void {
    this.authService.signOut();
  }
}
