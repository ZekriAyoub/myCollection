import { ChangeDetectionStrategy, Component, computed, effect, model, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-items';
import { SearchBar } from "./components/search-bar/search-bar";
import { Collection } from './models/collection';

@Component({
  selector: 'app-root',
  templateUrl : './app.html',
  styleUrl : './app.css',
  imports: [CollectionItemCard, SearchBar],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  coin! : CollectionItem;
  linx! : CollectionItem;
  stamp! : CollectionItem;

  searchText = model("");

  selectedCollection = signal<Collection | null>(null);
  collectionItems = computed(() => {
    const allItems = this.selectedCollection()?.items || [];
    return allItems?.filter(
      item => item.name.toLowerCase().includes(this.searchText().toLowerCase())
    );
  });

  constructor() {
    this.coin = new CollectionItem();
    this.coin.name = "Piece de 1980";
    this.coin.description = "Une pièce de monnaie rare datant de 1980, en excellent état.";
    this.coin.rarity = "Commune";
    this.coin.price = 170;
    this.coin.image = "img/coin1.png";

    this.linx = new CollectionItem();

    this.stamp = new CollectionItem();
    this.stamp.name = "Vieux Timbre";
    this.stamp.description = "Un vieux timbre de 1920.";
    this.stamp.rarity = "Rare";
    this.stamp.price = 555;
    this.stamp.image = "img/timbre1.png";

    const defaultCollection = new Collection();
    defaultCollection.title = "Default Collection";
    defaultCollection.items = [this.coin, this.linx, this.stamp];

    this.selectedCollection.set(defaultCollection);
  }

}
