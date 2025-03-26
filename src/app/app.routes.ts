import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './Products/Products.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductsResolver } from './core/resolvers/products.resolver';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent , title: 'Login'},
  { path: 'products', component: ProductsComponent , title: 'Products' , canActivate: [authGuard] , resolve: { productsData: ProductsResolver } },
];
