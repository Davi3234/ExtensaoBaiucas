import { FormComponent, FormControlField, FormGrouping, FormLine } from './../../services/interface-form';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormService } from '@app/services/form.service';

import { InputTextComponent } from '../ui/input-text/input-text.component';
import { Formulario } from '@app/services/form';

@Component({
  selector: 'dinamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextComponent,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  templateUrl: './dinamic-form.component.html',
  styleUrl: './dinamic-form.component.css'
})

export class DinamicFormComponent implements OnInit, FormComponent{
  @Input() idformulario = 0;
  groups: FormGrouping[] = [];
  lines: FormLine[] = [];
  fields: FormControlField[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.formService.buscarPorId(this.idformulario).subscribe((formulario) => {
      formulario.lines.forEach(line => {
        line.fields.forEach(field => {
          this.fields.push({
            ref: field.ref,
            width: field.width,
            options: field.options,
            required: field.required,
            placeholder: field.placeholder,
            inputType: field.type,
            label: field.label,
          });
        })
        this.lines.push({
          fields: this.fields
        })
        this.fields = [];
      });

      this.groups = [
        {
          lines: this.lines,
          layout: 'none',
          title: formulario.title
        }
      ];
    });
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
