import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Categoria } from 'src/app/interfaces/categoria';
import { Producto } from 'src/app/interfaces/produto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css'],
})
export class CreateProductsComponent implements OnInit {
  formProducto!: FormGroup;

  formGeneral!: FormGroup;
  formControlsGeneral: any = {};

  formCategoria!: FormGroup;
  formControlsCategoria: any = {};

  generales: Categoria[] = [];
  categorias: Categoria[] = [];

  listaCategoria: number[] = [];

  /*submit*/
  producto!: Producto;

  constructor(
    private fb: FormBuilder,
    private _categoriaServices: CategoriaService,
    private _productoServices: ProductoService
  ) {}

  ngOnInit(): void {
    this.getGenerales();
    this.createFormProducto();
    this.createFormGeneral();
    this.createFormCategoria();
  }

  getGenerales() {
    this._categoriaServices.getCategoriasGenerales().subscribe((data) => {
      this.generales = data;
      this.createFormGeneral();
    });
  }

  /*Formularios creados=====================*/
  createFormProducto() {
    this.formProducto = this.fb.group({
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      precioNormal: [
        '',
        [Validators.required, Validators.pattern(/^\d+(,\d+)?$/)],
      ],
      precioRebajado: ['', [Validators.pattern(/^\d+(,\d+)?$/)]],
      stock: ['', [Validators.required]],
      descripcion: [,[]],
      especificaciones: [, [this.validateJsonIfNotEmpty]],
      imagenes: [,[Validators.pattern(
            /^\[\s*"(https?:\/\/[^]+)"\s*(,\s*"(https?:\/\/[^"]+)")*\s*\]$/
          ),
        ],
      ],
    });
  }

  validateJsonIfNotEmpty(control: AbstractControl): { [key: string]: any } | null {

    const value = control.value;
    if (value === null || value === '') {
      return null; 
    }

    try {
      JSON.parse(value);
    } catch (error) {
      return { invalidJson: true };
    }
    return null;
  }

  createFormGeneral() {
    for (let general of this.generales) {
      this.formControlsGeneral[general.nombre] = [''];
    }
    this.formGeneral = this.fb.group(this.formControlsGeneral);
  }

  createFormCategoria() {
    for (let categoria of this.categorias) {
      this.formControlsCategoria[categoria.nombre] = [''];
    }
    this.formCategoria = this.fb.group(this.formControlsCategoria);
  }
  /*====================================*/

  /*Submit=====================*/
  submitFormProductos() {
    if (this.formProducto.invalid) {
      console.log('Formulario de producto invalido');
      return;
    }

    console.log('submit productos');
    this.producto = {
      nombre: this.formProducto.get('nombre')?.value,
      marca: this.formProducto.get('marca')?.value,
      sku: this.formProducto.get('sku')?.value,
      precio_normal: this.formProducto.get('precioNormal')?.value,
      precio_rebajado: this.formProducto.get('precioRebajado')?.value,
      stock: this.formProducto.get('stock')?.value,
      descripcion: this.formProducto.get('descripcion')?.value,
      especificaciones: this.formProducto.get('especificaciones')?.value,
      imagenes: this.formProducto.get('imagenes')?.value,
    };
  }
  submitFormGenerales() {
    console.log('submit 1');
  }
  submitFormCategorias() {
    console.log('submit 1');
  }
  /*====================================*/

  clickButton() {
    this.submitFormProductos();

    console.log(this.producto);
    this._productoServices.createProducto(this.producto).subscribe({
      next: (res: any) => {
        console.log('producto creado');
        console.log(res);
      },
      error: (e: HttpErrorResponse) => {
        console.log('a ocurrido un error al crear un producto');
        console.log(e);
      },
    });
  }

  clickLabelGenerales(general_id: number) {
    if (this.listaCategoria.includes(general_id)) {
      let indice = this.listaCategoria.indexOf(general_id);
      this.listaCategoria.splice(indice, 1);
      console.log('true');
      this.getCategorias();
    } else {
      console.log('false');
      this.listaCategoria.push(general_id);
      this.getCategorias();
    }
  }

  getCategorias() {
    this.categorias.splice(0, this.categorias.length);
    this.listaCategoria.forEach((numero) => {
      this._categoriaServices.getCategorias(numero).subscribe((data) => {
        this.categorias.push(...data);
        console.log(this.listaCategoria);

        this.createFormCategoria();
        console.log('aca => ', this.categorias);
      });
    });
  }
}
