import { Injectable } from '@angular/core';
import { Collection } from '../models/collection';
import { CollectionItem } from '../models/collection-items';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {

  private collections: Collection[]= [];
  private currentId = 1;
  private currentItemIndex : {[key: number]: number} = {};

  constructor(){
    this.generateDummyData();
  }

  generateDummyData() {
    const coin = new CollectionItem();
    coin.name = "Piece de 1972";
    coin.description = "Pièce de 50 centimes de francs.";
    coin.rarity = "Commune";
    coin.price = 170;
    coin.image = "img/coin1.png";

    const linx = new CollectionItem();

    const stamp = new CollectionItem();
    stamp.name = "Vieux Timbre";
    stamp.description = "Un vieux timbre de 1920.";
    stamp.rarity = "Rare";
    stamp.price = 555;
    stamp.image = "img/timbre1.png";

    const defaultCollection = new Collection();
    defaultCollection.title = "Collection mix";

    const storedCollection = this.add(defaultCollection);
    this.addItem(storedCollection, coin);
    this.addItem(storedCollection, linx);
    this.addItem(storedCollection, stamp);
  }

  getAll(): Collection[] {
    // coopy because we don't want to return the reference of the collection, otherwise it can be modified outside of the service
    return this.collections.map(collection => collection.copy());
  }

  get(collectionId : number): Collection | null {
    const storedCopy = this.collections.find(
      collection => collection.id === collectionId
    );
    return storedCopy ? storedCopy.copy() : null;
  }

  add(collection : Omit<Collection, 'id'|'items'>): Collection {
    const storedCopy = collection.copy();
    storedCopy.id = this.currentId;
    this.collections.push(storedCopy);

    this.currentItemIndex[storedCopy.id] = 1;
    this.currentId++;
    return storedCopy.copy();
  }

  update(collection : Omit<Collection, 'items'>): Collection | null {
    const storedCopy = this.collections.find(
      collection => collection.id === collection.id
    );

    if (!storedCopy) return null;

    Object.assign(storedCopy, collection);
    return storedCopy.copy();
  }

  delete(collectionId: number): void {
    this.collections = this.collections.filter(
      collection => collection.id !== collectionId
    );
  }

  addItem(collection: Collection, item: CollectionItem): Collection | null {
    const storedCollection = this.collections.find(
      c => c.id === collection.id
    );

    if (!storedCollection) return null;

    const storedItem = item.copy();
    storedItem.id = this.currentItemIndex[storedCollection.id];
    storedCollection.items.push(storedItem);

    this.currentItemIndex[storedCollection.id]++;

    return storedCollection.copy();
  }

  updateItem(collection : Collection, item: CollectionItem){
    const storedCollection = this.collections.find(
      storedCollection => storedCollection.id === collection.id
    );

    if (!storedCollection) return null;

    const storedItemIndex = storedCollection.items.findIndex(
      storedItem => storedItem.id === item.id
    );

    if (storedItemIndex === -1) return null;

    storedCollection.items[storedItemIndex] = item.copy();
    return storedCollection.copy();
  }

  deleteItem(collectionId: number, itemId: number): Collection | null {
    const storedCollection = this.collections.find(
      storedCollection => storedCollection.id === collectionId
    );

    if (!storedCollection) return null;

    storedCollection.items = storedCollection.items.filter(
      storedItem => storedItem.id !== itemId
    );

    return storedCollection.copy();
  }

}
