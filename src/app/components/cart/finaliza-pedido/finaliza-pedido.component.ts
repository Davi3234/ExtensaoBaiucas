import { PaymentMethod } from './../../../enums/payment-method';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../service/notification/notification.service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../../service/order/order.service';
import { ORDER_SERVICE_TOKEN } from '../../../service/services.injection';

@Component({
  selector: 'app-finaliza-pedido',
  standalone: true,
  imports: [
    CommonModule,
    NgbAlertModule,
    ReactiveFormsModule
  ],
  templateUrl: './finaliza-pedido.component.html',
  styleUrl: './finaliza-pedido.component.css'
})
export class FinalizaPedidoComponent {
  formulario!: FormGroup;

  constructor(
    @Inject(ORDER_SERVICE_TOKEN) private readonly orderService: OrderService,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      formaPagamento: ['', [
        Validators.required,
      ]],
      tipoEntrega: ['', [
        Validators.required,
      ]],
      endereco: ['', [
        Validators.required,
      ]],
    });
  }

  salvar(){
    // this.orderService.criar();
  }
  cancelar(){
    // this.
  }
}
