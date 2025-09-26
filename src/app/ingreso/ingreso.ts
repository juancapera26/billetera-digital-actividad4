import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './ingreso.html',
  styleUrls: ['./ingreso.css'],
})
export class Ingreso {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Debe ingresar usuario y contraseña.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    const fakeToken = btoa(`${this.username}:${this.password}`).substring(0, 5);
    localStorage.setItem('auth_token', fakeToken);

    console.log('Login successful!');
    console.log('Token almacenado:', fakeToken);

    this.router.navigate(['/Dashboard']);
  }
}
