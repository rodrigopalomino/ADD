import { Component, OnInit } from '@angular/core';
import { Categorias_Productos } from 'src/app/interfaces/categoria_producto';
import { Producto } from 'src/app/interfaces/produto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productos: Categorias_Productos[] = [];

  constructor(private _productoServices: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this._productoServices.getProductos().subscribe((data) => {
      this.productos = data;
      console.log(this.productos);
    });
  }
}
