import { CategoryService } from '../../../../service/category/category.service';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../core/menu/menu.component';
import { Category } from '../../../../service/category/category';
import { Router } from '@angular/router';
import { SelectionService } from '../../../../service/selection/selection.service';

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
    private readonly categoryService: CategoryService,
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
      console.log(element);
    });
  }

}
