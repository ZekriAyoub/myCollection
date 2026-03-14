import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-items';
import { SearchBar } from "./components/search-bar/search-bar";

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
  count = 0;
  searchText = "";

 itemList: CollectionItem[] = [];
 selectedItemIndex = signal(0);
 selectedItem = computed(()=> this.itemList[this.selectedItemIndex()]);

 loggeffect = effect(() => {
  console.log("Selected item changed: ", this.selectedItem(), "selected item index: ", this.selectedItemIndex());
 });

  constructor() {
    this.coin = new CollectionItem();
    this.coin.name = "Piece de 1980";
    this.coin.description = "Une pièce de monnaie rare datant de 1980, en excellent état.";
    this.coin.rarity = "Commune";
    this.coin.price = 170;
    this.coin.image = "img/coin1.png";

    this.linx = new CollectionItem();

    this.itemList = [this.coin, this.linx];
  }

  incrementCount() {
    this.count++;
  }

  incrementIndex() {
    this.selectedItemIndex.update((currentValue) => {
      return (currentValue + 1) % this.itemList.length;
    });
  }

}
