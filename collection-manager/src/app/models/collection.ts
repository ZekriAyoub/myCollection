import { CollectionItem } from "./collection-items";

export class Collection {
  id= -1;
  title = "My Collection";
  items: CollectionItem[]= [];

  copy() {
    const copiedCollection = Object.assign(new Collection(), this);
    //car tableau copié par référence, il faut faire une copie profonde
    copiedCollection.items = this.items.map(item => item.copy());
    return copiedCollection;
  }
}
