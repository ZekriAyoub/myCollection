import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collection-item-detail',
  imports: [],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.css',
})
export class CollectionItemDetail implements OnInit {

  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  itemId = signal<number | null>(null);

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    const selectedId = params['id'] ? parseInt(params['id']) : null;
    this.itemId.set(selectedId);
  }

  next() {
    const currentd = this.itemId();
    if(currentd){
      const nextId = currentd + 1;
      this.router.navigate(['item', nextId])
    }
  }


}
