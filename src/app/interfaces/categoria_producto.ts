import { Categoria } from './categoria';
import { FetchProducto, Producto } from './produto';

export interface Fetch_Categorias_Productos {
  categoria: Categoria;
  producto: FetchProducto;
}

export interface Categorias_Productos {
  categoria: Categoria;
  producto: Producto;
}
