import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../core/menu/menu.component';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  ngOnInit(): void {
    console.log('ListUserComponent carregado');
  }

  teste() {
    console.log('hello world');
    alert('teste');
  }
}
