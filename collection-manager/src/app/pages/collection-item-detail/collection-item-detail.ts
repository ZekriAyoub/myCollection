import { Component, inject, input} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection-item-detail',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.css',
})
export class CollectionItemDetail {

  nameFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl(0, [Validators.min(0), Validators.required]);

  submit(event : Event){
    event.preventDefault();
    console.log(this.nameFormControl.value);
    console.log(this.priceFormControl.value);
  }

}
