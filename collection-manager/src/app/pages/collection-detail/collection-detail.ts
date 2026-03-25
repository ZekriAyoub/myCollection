import { Component, computed, inject, model, signal } from '@angular/core';
;
import { CollectionService } from '../../services/collection-service';
import { CollectionItem } from '../../models/collection-items';
import { Collection } from '../../models/collection';
import { SearchBar } from "../../components/search-bar/search-bar";
import { CollectionItemCard } from "../../components/collection-item-card/collection-item-card";
import { Router } from '@angular/router';


@Component({
  selector: 'app-collection-detail',
  imports: [SearchBar, CollectionItemCard],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css',
})
export class CollectionDetail {

  private collectionService = inject(CollectionService);
  private readonly router = inject(Router);
  coin! : CollectionItem;
  linx! : CollectionItem;
  stamp! : CollectionItem;

  searchText = model("");

  selectedCollection = signal<Collection | null>(null);
  collectionItems = computed(() => {
    const allItems = this.selectedCollection()?.items || [];
    return allItems?.filter(
      item => (item.name || "").toLowerCase().includes((this.searchText() || "").toLowerCase())
    );
  });

  constructor() {
    const allCollections = this.collectionService.getAll();
    if (allCollections.length > 0) {
      this.selectedCollection.set(allCollections[0]);
    }
  }

  addGenericItem() {
    /*const collection = this.selectedCollection();
    if (collection){
      const storedCollection = this.collectionService.addItem(
        collection, new CollectionItem()
      )
      this.selectedCollection.set(storedCollection);
    }*/
    this.router.navigate(['item'])
  }
}
