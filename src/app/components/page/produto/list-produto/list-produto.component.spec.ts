import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProdutoComponent } from './list-produto.component';

describe('ListProdutoComponent', () => {
  let component: ListProdutoComponent;
  let fixture: ComponentFixture<ListProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
