import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { routes } from '../../../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent{
  routesWithTitle: Routes = [];

  constructor (private readonly router: Router) {
    this.routesWithTitle = routes.filter(route => route.title);
  }
}
