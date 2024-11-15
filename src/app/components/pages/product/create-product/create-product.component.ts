import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Result } from '../../../../@types/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CATEGORY_SERVICE_TOKEN, PRODUCT_SERVICE_TOKEN } from '../../../../service/services.injection';
import { IProductService } from '../../../../interface/product.service.interface';
import { MenuComponent } from '../../core/menu/menu.component';
import { ICategoryService } from '../../../../interface/category.service.interface';
import { Category } from '../../../../service/category/category';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    NgbAlertModule,
    MenuComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  formulario!: FormGroup;
  categories!: Category[];

  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN) private readonly productService: IProductService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    @Inject(CATEGORY_SERVICE_TOKEN) private readonly categoryService: ICategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.listar().subscribe(result => {
      this.categories = result.value
    });
    this.formulario = this.formBuilder.group({
      name: ['X-Burguer', [
        Validators.required,
      ]],
      description: ['X-Burguer normal', [
        Validators.required,
      ]],
      value: [25, [
        Validators.required,
      ]],
      category: [4, [
        Validators.required,
      ]],
    });
  }

  salvar() {
    if (this.formulario.valid) {
      this.productService.criar(this.formulario.value).subscribe({
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
    this.router.navigate(['/products']);
  }
}
