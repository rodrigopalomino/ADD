export interface FetchProducto {
  producto_id?: number;
  nombre: string;
  marca: string;
  sku: string;
  precio_normal: number;
  precio_rebajado?: number;
  stock: number;
  descripcion: string;
  especificaciones: string;
  imagenes: string;
}

export interface Producto {
  producto_id?: number;
  nombre: string;
  marca: string;
  sku: string;
  precio_normal: number;
  precio_rebajado?: number;
  stock: number;
  descripcion: string;
  especificaciones: Record<string, any>;
  imagenes: string[];
}
