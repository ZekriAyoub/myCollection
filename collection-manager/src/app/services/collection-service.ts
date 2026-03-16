import { Injectable } from '@angular/core';
import { Collection } from '../models/collection';
import { CollectionItem, Rarities } from '../models/collection-items';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {

  private collections: Collection[]= [];
  private currentId = 1;
  private currentItemIndex : {[key: number]: number} = {};

  constructor(){
    this.load();
  }

  private save() {
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }

  private load(){
    const collectionsJson= localStorage.getItem('collections');
    if (collectionsJson) {
      this.collections = JSON.parse(collectionsJson).map((collectionJson: any) => {
        const collection = Object.assign(new Collection(), collectionJson);
        const itemsJson = collectionJson.items || [];
        collection.items = itemsJson.map((item: any) => Object.assign(new CollectionItem(), item));
        return collection;
      });
      this.currentId = Math.max(...this.collections.map(c => c.id), 0) + 1;
      this.currentItemIndex = this.collections.reduce(
        (indexes: {[key: number]: number}, collection) => {
          indexes[collection.id] = Math.max(...collection.items.map(i => i.id), 0) + 1;
          return indexes;
        }, {}
      );
    } else {
      this.generateDummyData();
      this.save();
    }
  }

  generateDummyData() {
    const coin = new CollectionItem();
    coin.name = "Piece de 1972";
    coin.description = "Pièce de 50 centimes de francs.";
    coin.rarity = Rarities.Common;
    coin.price = 170;
    coin.image = "img/coin1.png";

    const linx = new CollectionItem();

    const stamp = new CollectionItem();
    stamp.name = "Vieux Timbre";
    stamp.description = "Un vieux timbre de 1920.";
    stamp.rarity = Rarities.Rare;
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
    // copy because we don't want to return the reference of the collection, otherwise it can be modified outside of the service
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
    this.save();

    return storedCopy.copy();
  }

  update(collection : Omit<Collection, 'items'>): Collection | null {
    const storedCopy = this.collections.find(
      collection => collection.id === collection.id
    );

    if (!storedCopy) return null;

    Object.assign(storedCopy, collection);
    this.save();
    return storedCopy.copy();
  }

  delete(collectionId: number): void {
    this.collections = this.collections.filter(
      collection => collection.id !== collectionId
    );
    this.save();
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
    this.save();

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
    this.save();
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
    this.save();
    return storedCollection.copy();
  }

}
