import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Result } from '../../../../@types/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CATEGORY_SERVICE_TOKEN,
  PRODUCT_SERVICE_TOKEN,
} from '../../../../service/services.injection';
import { IProductService } from '../../../../interface/product.service.interface';
import { MenuComponent } from '../../core/menu/menu.component';
import { ICategoryService } from '../../../../interface/category.service.interface';
import { Categoria } from '../../../../service/category/category';
import { Produto } from '../../../../service/product/product';
import { NotificationService } from '../../../../service/notification/notification.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, NgbAlertModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  formulario!: FormGroup;
  categories!: Categoria[];
  product!: Produto;

  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productService: IProductService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    @Inject(CATEGORY_SERVICE_TOKEN)
    private readonly categoryService: ICategoryService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.categoryService.listar().subscribe((result) => {
      this.categories = result.value;
    });

    this.formulario = this.formBuilder.group({
      id: [0, []],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      value: ['', [Validators.required]],
      idCategory: ['', [Validators.required]],
      category: ['', []],
      ativo: ['', [Validators.required]],
    });

    this.productService.buscarPorId(parseInt(id!)).subscribe((result) => {
      this.product = result.value.product;

      this.formulario.get('id')?.setValue(this.product.id);
      this.formulario.get('name')?.setValue(this.product.name);
      this.formulario.get('description')?.setValue(this.product.description);
      this.formulario.get('value')?.setValue(this.product.value);
      this.formulario.get('idCategory')?.setValue(this.product.category?.id);
      this.formulario.get('ativo')?.setValue(this.product.ativo);
    });
  }

  salvar() {
    this.formulario.markAllAsTouched();

    this.formulario.value.category = {id: this.formulario.value.idCategory};
    if (this.formulario.valid) {
      this.formulario.value.category = {id: this.formulario.value.idCategory};

      this.productService.editar(this.formulario.value).subscribe({
        next: () => {
          this.notificationService.success({
            title: 'Edição de Produto',
            message: 'Sucesso ao editar o produto',
          });

          this.cancelar();
        },
        error: ({ error }: { error: Result }) => {
          if (error.status === 400) {
            const causes = error.error?.causes || [];

            causes.forEach(({ message, origin }) => {
              this.formulario
                .get('produto')
                ?.setErrors({ backendError: message });
            });

            this.notificationService.error({
              title: 'Edição de Produto',
              message: 'Erro ao editar o produto',
            });
          }
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/products']);
  }
}
