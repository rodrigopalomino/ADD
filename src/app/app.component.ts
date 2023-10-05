import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'admin';
  productos: string[] = ['Todos los productos', 'Añadir nuevo'];
  c_productos: boolean = true;

  constructor(private router: Router) {}

  click_productos() {
    this.c_productos = !this.c_productos;
  }

  click_producto(index: number) {
    console.log(index);

    switch (index) {
      case 0:
        this.router.navigate(['/products']);
        break;
      case 1:
        this.router.navigate(['/products/create']);
        break;
    }
  }
}
