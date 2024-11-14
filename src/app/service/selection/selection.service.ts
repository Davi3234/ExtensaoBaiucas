import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selectedId?: number;

  selectItem(id?: number) {
    this.selectedId = id;
    this.removeSelectedItems();

    const element = document.getElementById(`line${id}`);
    if (element) {
      element.className = element.className + " row-selected";
    }

    if (this.selectedId) {
      this.enableButton('btnEditar');
      this.enableButton('btnExcluir');
    }
  }

  removeSelectedItems() {
    const elements = document.getElementsByClassName('row-selected');
    Array.from(elements).forEach((el) => el.className = '');
  }

  enableButton(buttonId: string) {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    if (button) button.disabled = false;
  }
}
