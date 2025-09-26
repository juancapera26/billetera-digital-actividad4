import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs'; // 👈 Importante

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule  
  ],
})
export class Dashboard implements OnInit, OnDestroy {
  private timeoutId?: number;
  private readonly timeout = 60000;

  ingreso: number = 1400000;
  gastos: number = 60000;
  nombre: string = 'Juan';

  constructor(private router: Router) {}

  get balance(): number {
    return this.ingreso - this.gastos;
  }

  ngOnInit() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.resetTimeout();
    }
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  @HostListener('window:mousemove')
  @HostListener('window:mousedown')
  @HostListener('window:keypress')
  @HostListener('window:scroll')
  @HostListener('window:touchstart')
  resetTimeout() {
    this.clearTimeout();
    this.timeoutId = window.setTimeout(() => {
      this.logout();
    }, this.timeout);
  }

  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  logout() {
    alert('Sesión expirada, por favor ingrese nuevamente');
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
  }
}
