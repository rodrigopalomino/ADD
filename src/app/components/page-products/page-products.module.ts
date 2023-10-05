import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageProductsRoutingModule } from './page-products-routing.module';
import { ProductsComponent } from './products/products.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent, CreateProductsComponent],
  imports: [CommonModule, PageProductsRoutingModule, ReactiveFormsModule],
})
export class PageProductsModule {}
