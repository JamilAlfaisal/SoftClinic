import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  router = inject(Router);
  username = 'softwave';
  password = 'softwave';
  form = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required]}),
  })

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid){
      if (this.form.value.username === this.username && this.form.value.password === this.password) {
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['/patients']);
      } else {
        localStorage.setItem('isAuthenticated', 'false');
        alert('Invalid username or password');
      }
    }

  }
}
