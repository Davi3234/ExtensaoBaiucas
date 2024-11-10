import { UserService } from '../../../../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { User } from '../../../../service/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{

  users?: User[]
  id?: number

  constructor(
    private readonly userService: UserService,
    private readonly route: Router
  ){}

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.userService.listar().subscribe(request => {
      this.users = request.value;
    });
  }

  incluir(){
    this.route.navigate(['users/create']);
  }
  editar(){
    this.route.navigate([`users/edit/${this.id}`]);

  }
  excluir(){

  }
}
