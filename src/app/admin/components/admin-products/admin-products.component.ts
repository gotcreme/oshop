import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products.map(p => new Product(p.payload));
        this.initializeTable(this.products);
      });
  };

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);     
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
    
    this.initializeTable(filteredProducts);
  }

  delete(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(productId);
    }
  }

  reloadItems(params) { 
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
