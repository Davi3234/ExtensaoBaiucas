import { Component, Inject, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Category } from '../../../../service/category/category';
import { Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';
import { ICategoryService } from '../../../../interface/category.service.interface';
import { CATEGORY_SERVICE_TOKEN } from '../../../../service/services.injection';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit{

  categories?: Category[]
  id?: number

  constructor(
    @Inject(CATEGORY_SERVICE_TOKEN) private readonly categoryService: ICategoryService,
    private readonly route: Router,
    protected readonly selectionService: SelectionService
  ){}

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.categoryService.listar().subscribe(request => {
      this.categories = request.value;
    });
  }

  incluir(){
    this.route.navigate(['categories/create']);
  }

  editar(){
    this.route.navigate([`categories/edit/${this.id}`]);
  }

  excluir(){
    this.categoryService.excluir(this.id!).subscribe(element => {
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
