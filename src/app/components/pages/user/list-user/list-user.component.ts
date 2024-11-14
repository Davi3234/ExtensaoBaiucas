import { UserService } from '../../../../service/user/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { User } from '../../../../service/user/user';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { IUserService } from '../../../../interface/user.service.interface';
import { USER_SERVICE_TOKEN } from '../../../../service/services.injection';

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
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
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

  selectItem(id?: number){

    this.id = id;

    this.removeSelectedItems();

    const element = document.getElementById(`line${id}`);
    element!.className = element!.className +" row-selected";

    if(this.id){
      this.enableEditButton();
      this.enableRemoveButton();
    }
  }

  removeSelectedItems(){
    const elements = document.getElementsByClassName('row-selected');

    for (let i = 0; i < elements.length; i++) {
      elements[i].className = "";
    }
  }

  enableEditButton(){
    const btnEditar = document.getElementById('btnEditar') as HTMLButtonElement;

    btnEditar.disabled = false;
  }
  enableRemoveButton(){
    const btnExcluir = document.getElementById('btnExcluir') as HTMLButtonElement;

    btnExcluir.disabled = false;
  }

  incluir(){
    this.route.navigate(['users/create']);
  }
  editar(){
    this.route.navigate([`users/edit/${this.id}`]);

  }
  excluir(){
    this.userService.excluir(this.id!).subscribe(element => {
      if(element.status == HttpStatusCode.Ok){
        this.listAll();
      }
    });
  }

}
