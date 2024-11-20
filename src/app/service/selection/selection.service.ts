import { Injectable } from '@angular/core';

export interface SortEvent {
  column: string
  direction: 'asc' | 'desc'
}

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

  selectAlert(id?: number){
    this.selectedId = id;
    this.removeSelectedAlerts();

    const element = document.getElementById(`line${id}`);
    if (element) {
      element.className = element.className + " alert-selected";
    }

    if (this.selectedId) {
      this.enableButton('btnEditar');
      this.enableButton('btnExcluir');
      this.enableButton('btnAddCarrinho');
    }

  }

  removeSelectedAlerts() {

    const elements = document.getElementsByClassName('alert-selected');
    Array.from(elements).forEach((el) => {
      el.className = el.className.replace('alert-selected', '');
    });
  }

  removeSelectedItems() {
    const elements = document.getElementsByClassName('row-selected');
    Array.from(elements).forEach((el) => el.className = '');
  }

  enableButton(buttonId: string, active: boolean = true) {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    if (button) button.disabled = !active;
  }
}
