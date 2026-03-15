export class CollectionItem {
  id= -1;
  name = "Excalibur";
  description = "A legendary sword of unmatched sharpness and history.";
  rarity = "Legendary";
  price = 199;
  image= "img/linx.png";

  copy() {
    return Object.assign(new CollectionItem(), this);
  }
}
