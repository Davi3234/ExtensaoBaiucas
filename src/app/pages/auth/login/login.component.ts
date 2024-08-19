import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(DinamicFormComponent) dinamicFormComponent!: DinamicFormComponent;

  constructor(private formService: FormService){}

  ngOnInit(): void {
  }

  login(){
    const dsLoginValue = this.dinamicFormComponent.form.get('dsLogin');
    const dsSenhaValue = this.dinamicFormComponent.form.get('dsSenha');
    console.log(dsLoginValue)
    console.log(dsSenhaValue)
  }

  cadastrarUsuario(){

  }

}
