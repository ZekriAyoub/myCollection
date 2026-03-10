import { Component, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-items';

@Component({
  selector: 'app-root',
  templateUrl : './app.html',
  styleUrl : './app.css',
  imports: [CollectionItemCard],

})
export class App {
  coin! : CollectionItem;

  constructor() {
    this.coin = new CollectionItem();
    this.coin.name = "Piece de 1980";
    this.coin.description = "Une pièce de monnaie rare datant de 1980, en excellent état.";
    this.coin.rarity = "Commune";
    this.coin.price = 170;
    this.coin.image = "img/coin1.png";
  }
}
