import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreComponent } from './book-store/book-store.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { SharedModule } from '../shared/shared.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ReturnBookComponent } from './return-book/return-book.component';



@NgModule({
  declarations: [
    BookStoreComponent,
    UserOrdersComponent,
    MaintenanceComponent,
    ReturnBookComponent
  ],
  imports: [
    SharedModule
  ]
})
export class BooksModule { }
