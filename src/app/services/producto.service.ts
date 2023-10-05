import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FetchProducto, Producto } from '../interfaces/produto';
import {
  Categorias_Productos,
  Fetch_Categorias_Productos,
} from '../interfaces/categoria_producto';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  myApi: string = 'http://localhost:3000/';
  myApp: string = 'producto';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Categorias_Productos[]> {
    return this.http
      .get<Fetch_Categorias_Productos[]>(`${this.myApi}${this.myApp}`)
      .pipe(map(this.transform));
  }

  private transform(
    resp: Fetch_Categorias_Productos[]
  ): Categorias_Productos[] {
    const productList: Categorias_Productos[] = resp.map((product) => {
      const categortia: Categoria = {
        categoria_id: product.categoria.categoria_id,
        nombre: product.categoria.nombre,
        parent_id: product.categoria.parent_id,
      };
      const producto: Producto = {
        producto_id: product.producto.producto_id,
        nombre: product.producto.nombre,
        marca: product.producto.marca,
        sku: product.producto.nombre,
        stock: product.producto.stock,
        precio_normal: product.producto.precio_normal,
        precio_rebajado: product.producto.precio_rebajado,
        descripcion: product.producto.descripcion,
        especificaciones: JSON.parse(product.producto.especificaciones),
        imagenes: JSON.parse(product.producto.imagenes),
      };

      return {
        categoria: categortia,
        producto: producto,
      };
    });

    return productList;
  }

  createProducto(producto: Producto) {
    return this.http.post(`${this.myApi}${this.myApp}/create`, producto);
  }
}
