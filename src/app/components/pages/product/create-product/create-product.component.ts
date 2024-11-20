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
import { Categoria } from '../../../../service/category/category';
import { NotificationService } from '../../../../service/notification/notification.service';

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
  categories!: Categoria[];

  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN) private readonly productService: IProductService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    @Inject(CATEGORY_SERVICE_TOKEN) private readonly categoryService: ICategoryService,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.categoryService.listar().subscribe(result => {
      this.categories = result.value
    });

    this.formulario = this.formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      description: ['', [
        Validators.required,
      ]],
      value: ['', [
        Validators.required,
      ]],
      category: ['', [
        Validators.required,
      ]],
    });
  }

  salvar() {
    this.formulario.markAllAsTouched();

    if (this.formulario.valid) {
      this.formulario.value.category = {id: this.formulario.value.category};
      this.productService.criar(this.formulario.value).subscribe({
        next: () => {
          this.notificationService.success({
            title: 'Cadastro de Produto',
            message: 'Sucesso ao cadastrar o produto',
          });

          this.cancelar();
        },
        error: ({ error }: { error: Result }) => {
          if (error.status === 400) {
            const causes = error.error?.causes || [];

            causes.forEach(({ message, origin }) => {
              this.formulario.get('produto')?.setErrors({ backendError: message });
            });

            this.notificationService.error({
              title: 'Cadastro de Produto',
              message: 'Erro ao cadastrar o produto',
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
