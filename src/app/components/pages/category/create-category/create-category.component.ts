import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Result } from '../../../../@types/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CATEGORY_SERVICE_TOKEN } from '../../../../service/services.injection';
import { ICategoryService } from '../../../../interface/category.service.interface';
import { MenuComponent } from '../../core/menu/menu.component';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    CommonModule,
    NgbAlertModule,
    MenuComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  formulario!: FormGroup;

  constructor(
    @Inject(CATEGORY_SERVICE_TOKEN) private readonly categoryService: ICategoryService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^(?!\s*$)[a-zA-Z\s]+$/)
      ]],
    });
  }

  salvar() {
    if (this.formulario.valid) {
      this.categoryService.criar(this.formulario.value).subscribe({
        next: () => {
          this.cancelar();
        },
        error: ({ error }: { error: Result }) => {
          if (error.status === 400) {
            const causes = error.error?.causes || [];

            causes.forEach(({ message, origin }) => {
              if (origin.includes('login'))
                this.formulario.get('login')?.setErrors({ backendError: message });
            });
          }
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/categories']);
  }
}
