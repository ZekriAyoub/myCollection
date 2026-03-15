import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collection-item-detail',
  imports: [],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.css',
})
export class CollectionItemDetail implements OnInit, OnDestroy{

  private readonly activedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  itemId = signal<number | null>(null);

  routeSubscription : Subscription | null = null;

  ngOnInit(): void {
    this.routeSubscription = this.activedRoute.params.subscribe(
      (params) => {
        const selectedId = params['id'] ? parseInt(params['id']) : null;
        this.itemId.set(selectedId);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }

  next() {
    const currentd = this.itemId();
    if(currentd){
      const nextId = currentd + 1;
      this.router.navigate(['item', nextId])
    }
  }


}
