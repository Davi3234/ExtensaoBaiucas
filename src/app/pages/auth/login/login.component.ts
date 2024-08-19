import { Component, Input, OnInit } from '@angular/core';
import { DinamicFormComponent } from '@app/components/dinamic-form/dinamic-form.component';
import { MenuComponent } from '@app/components/menu/menu.component';
import { PageComponent } from '@app/components/page/page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '@app/services/form.service';
import { Formulario } from '@app/services/form';
import { FormControlField, FormGrouping, FormLine } from '@app/services/interface-form';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    DinamicFormComponent,
    MatGridListModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  @Input('dsLogin') dsLogin = "";
  @Input('dsSenha') dsSenha = "";

  groups: FormGrouping[] = [];
  lines: FormLine[] = [];
  fields: FormControlField[] = [];
  idformulario = 1;

  constructor(private formService: FormService){}

  ngOnInit(): void {
  }

  login(){
    console.dir(this.dsLogin);
    console.dir(this.dsSenha);
  }

  cadastrarUsuario(){

  }

}
