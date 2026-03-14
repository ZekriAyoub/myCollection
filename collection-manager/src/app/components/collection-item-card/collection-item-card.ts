import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { CollectionItem } from '../../models/collection-items';

@Component({
  selector: 'app-collection-item-card',
  imports: [],
  templateUrl: './collection-item-card.html',
  styleUrl: './collection-item-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CollectionItemCard {
  item: InputSignal<CollectionItem> = input.required<CollectionItem>();
}
