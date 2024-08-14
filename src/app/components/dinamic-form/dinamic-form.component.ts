import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextComponent } from '../ui/input-text/input-text.component';

export interface FormComponent {
  form: FormGroup,
  groups: FormGrouping[]
}

interface FormGrouping{
  lines: FormLine[],
  layout: "none" | "card" | "expansion",
  title?: string,
  class?: string,
  expanded?: boolean
}

export interface FormControlFieldAsyncOptions {
  inputType?: "number" | "text" | "currency" | "email" | "time" | "cnpjCpf" | "password" | "onlyNumber" | "customPassword",
}

interface FormLine{
  fields: FormControlField[],
  widthGap?: number,
  class?: string,
  layout?: string
}

interface FormControlField{
  ref: string,
  width: number,
  options?: any[],
  readonly?: boolean,
  visible?: boolean,
  required?: boolean,
  reset?: boolean,
  tooltip?: string,
  mask?: string,
  placeholder?: string,
  inputType?: "text" | "password" | "number" | "dropDown" | "checkBox" | "datePicker" | "monthPicker" | "intlPhone" | "textarea" | "simpleText" | "radioGroup" | "autoComplete" | "colorPicker" | "time" | "autoCompleteObjetcData";
  style?: "standard" | "fill" | "outline" | "legacy",
  label?: string
}

@Component({
  selector: 'dinamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextComponent],
  templateUrl: './dinamic-form.component.html',
  styleUrl: './dinamic-form.component.css'
})

export class DinamicFormComponent implements OnInit, FormComponent{
  @Input() groups: FormGrouping[] = [
    {
      "title": "Formulário de Login",
      "layout": "none",
      "lines":[
        {
          "fields": [
            {
              "ref": "nmUsuario",
              "width": 50,
              "label": "Usuário",
              "inputType": "text",
              "placeholder": "Digite o nome do usuário",
              "required": true
            },
            {
              "ref": "dsSenha",
              "width": 50,
              "label": "Senha",
              "inputType": "password",
              "placeholder": "Digite a senha",
              "required": true
            }
          ]
        }
      ]
    }

  ];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.groups.forEach(group => {
      group.lines.forEach(line => {
        line.fields.forEach(field => {
          const control = this.createControl(field);
          this.form.addControl(field.ref, control);
        });
      });
    });
  }

  createControl(field: FormControlField) {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    // Adicione mais validações conforme necessário

    return this.fb.control('', validators);
  }
}
