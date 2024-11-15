import { IProductService } from './../../../../interface/product.service.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Product } from '../../../../service/product/product';
import { Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import { PRODUCT_SERVICE_TOKEN } from '../../../../service/services.injection';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{

  products?: Product[]
  id?: number

  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN) private readonly productService: IProductService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService
  ){}

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.productService.listar().subscribe(request => {
      this.products = request.value;
    });
  }

  incluir(){
    this.route.navigate(['products/create']);
  }

  editar(){
    this.route.navigate([`products/edit/${this.id}`]);
  }

  excluir(){
    this.productService.excluir(this.id!).subscribe(element => {
      if(element.status == HttpStatusCode.Ok){
        this.listAll();
      }
    });
  }

  selectItem(id?: number){
    this.id = id;
    this.selectionService.selectItem(id);
  }

}
