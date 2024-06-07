import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { BookStoreComponent } from './books/book-store/book-store.component';
import { UserOrdersComponent } from './users/user-orders/user-orders.component';
import { ProfileComponent } from './users/profile/profile.component';
import { MaintenanceComponent } from './books/maintenance/maintenance.component';
import { ApprovalRequestsComponent } from './users/approval-requests/approval-requests.component';
import { ReturnBookComponent } from './books/return-book/return-book.component';


export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"home",component:BookStoreComponent},
    {path:"viewBook",component:BookStoreComponent},
    {path:"my-orders",component:UserOrdersComponent},
    {path:"maintenance",component:MaintenanceComponent},
    {path:"reqests",component:ApprovalRequestsComponent},
    {path:"returnBook",component:ReturnBookComponent},
    {path:"profile",component:ProfileComponent},
    {path:"register",component:RegisterComponent},
    {path:"approval",component:ApprovalRequestsComponent},
    {path:"**",component:PageNotFoundComponent},
];
