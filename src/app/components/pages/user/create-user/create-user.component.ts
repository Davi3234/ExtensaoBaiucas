import { Component } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { UserService } from '../../../../service/user/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  constructor (private userService: UserService)
  {}

  salvar(){
    // this.userService.criar('user');
  }
  cancelar(){

  }
}
