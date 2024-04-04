import { Component } from '@angular/core';

export interface Parcel {
  sku: string;
  description: string;
  address: string;
  town: string;
  country: string;
  date: any;
}

export type PageType = 'list' | 'form';

@Component({
  selector: 'app-root',
  styleUrl: './app.component.less',
  template:`
    <nav>
      <button type="button" (click)="togglePage('list')">List</button>
      <button type="button" (click)="togglePage('form')">Form</button>
    </nav>
    <parcel-form *ngIf="showForm"></parcel-form>

    <parcel-list *ngIf="showList"></parcel-list>
  `,
})
export class AppComponent {
  pageType: PageType = 'list';
  title = 'parcel-app-ui';

  get showList() {
    return this.pageType === 'list';
  }

  get showForm() {
    return this.pageType === 'form';
  }

  togglePage(type: PageType) {
    this.pageType = type;
  }
}
