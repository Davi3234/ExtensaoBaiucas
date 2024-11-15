import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Result } from '../../../../@types/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CATEGORY_SERVICE_TOKEN } from '../../../../service/services.injection';
import { ICategoryService } from '../../../../interface/category.service.interface';
import { MenuComponent } from '../../core/menu/menu.component';
import { Category } from '../../../../service/category/category';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    CommonModule,
    NgbAlertModule,
    MenuComponent,
    ReactiveFormsModule
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {

  formulario!: FormGroup;
  category!: Category;

  constructor(
    @Inject(CATEGORY_SERVICE_TOKEN) private readonly categoryService: ICategoryService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.formulario = this.formBuilder.group({
      id: ['', []],
      name: ['', [
        Validators.required,
        Validators.pattern(/^(?!\s*$)[a-zA-Z\s]+$/)
      ]],
    });

    this.categoryService.buscarPorId(parseInt(id!)).subscribe((result) => {
      this.category = result.value.category;

      this.formulario.get('id')?.setValue(this.category.id);
      this.formulario.get('name')?.setValue(this.category.name);
    });
  }

  salvar() {
    if (this.formulario.valid) {
      this.categoryService.editar(this.formulario.value).subscribe({
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
