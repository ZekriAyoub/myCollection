export const Rarities = {
  Legendary: "Legendary",
  Rare: 'Rare',
  Common: 'Common',
  Uncommon: 'Uncommon'
} as const;
export type Rarity = typeof Rarities[keyof typeof Rarities];

export class CollectionItem {
  id= -1;
  name = "Excalibur";
  description = "A legendary sword of unmatched sharpness and history.";
  rarity: Rarity = Rarities.Legendary;
  price = 199;
  image= "img/linx.png";

  copy() {
    return Object.assign(new CollectionItem(), this);
  }
}
