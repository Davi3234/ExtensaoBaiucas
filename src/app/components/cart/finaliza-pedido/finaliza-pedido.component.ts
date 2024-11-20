import { Item } from './../../../service/order/item';
import { PaymentMethod } from './../../../enums/payment-method';
import { Component, inject, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NotificationService } from '../../../service/notification/notification.service';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ORDER_SERVICE_TOKEN } from '../../../service/services.injection';
import { HttpStatusCode } from '@angular/common/http';
import { TypeDelivery } from '../../../enums/type-delivery';
import { Order } from '../../../service/order/order';
import { CartService } from '../../../service/cart/cart.service';
import { IOrderService } from '../../../interface/order.service.interface';
import { CartComponent } from '../cart.component';
import { WindowCartComponent } from '../window-cart/window-cart.component';

@Component({
  selector: 'app-finaliza-pedido',
  standalone: true,
  imports: [CommonModule, NgbAlertModule, ReactiveFormsModule],
  templateUrl: './finaliza-pedido.component.html',
  styleUrl: './finaliza-pedido.component.css',
})
export class FinalizaPedidoComponent {
  formulario!: FormGroup;
  itens!: Item[];
  private readonly modalService = inject(NgbModal);
  private readonly offcanvasService = inject(NgbOffcanvas);

  constructor(
    @Inject(ORDER_SERVICE_TOKEN) private readonly orderService: IOrderService,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {

    this.setItens();
    this.formulario = this.formBuilder.group({
      formaPagamento: ['', [Validators.required]],
      tipoEntrega: ['', [Validators.required]],
      endereco: ['', []],
    });

    this.formulario
      .get('tipoEntrega')
      ?.valueChanges.subscribe((tipoEntrega) => {
        const enderecoControl = this.formulario.get('endereco');

        if (tipoEntrega === TypeDelivery.DELIVERY) {
          enderecoControl?.setValidators([Validators.required]);
          enderecoControl?.enable();
          enderecoControl?.setValue('');
        } else {
          enderecoControl?.setValue('');
          enderecoControl?.disable();
          enderecoControl?.clearValidators();
        }

        enderecoControl?.updateValueAndValidity();
      });
  }

  salvar() {
    this.formulario.markAllAsTouched();

    if (this.formulario.valid) {
      const pedido = this.montaPedido(this.formulario.value);

      this.orderService.criar(pedido).subscribe({
        next: () => {
          this.notificationService.success({
            title: 'Cadastro de Pedido',
            message: 'Sucesso ao cadastrar o pedido',
          });
          this.cartService.clearCart();
          this.modalService.dismissAll();
          this.offcanvasService.dismiss();
        },
        error: (error) => {
          if (error.status === HttpStatusCode.BadRequest) {
            this.notificationService.error({
              title: 'Cadastro de Pedido',
              message: 'Erro ao cadastrar o pedido',
            });
          }
        },
      });
    } else {
      this.notificationService.error({
        title: 'Cadastro de Pedido',
        message: 'Preencha todos os campos obrigatórios.',
      });
    }
  }

  setItens(){
    this.cartService.getItems().subscribe((items) => {
      this.itens = items;
    });
  }

  montaPedido(formValue: {
    formaPagamento: PaymentMethod,
    tipoEntrega: TypeDelivery,
    endereco?: string,
    observacao?: string,
  }): Order {

    return {
      id: 0,
      client: undefined,
      totalPrice: undefined,
      state: undefined,
      observation: formValue.observacao,
      paymentMethod: formValue.formaPagamento,
      type: formValue.tipoEntrega,
      address: formValue.endereco,
      items: this.itens
    }
  }
}
