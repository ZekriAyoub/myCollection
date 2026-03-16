import { Component, inject, input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Rarities } from '../../models/collection-items';

@Component({
  selector: 'app-collection-item-detail',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.css',
})
export class CollectionItemDetail {

  private formBuilder = inject(FormBuilder);

  readonly rarities = Object.values(Rarities);

  itemFormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', Validators.required],
    image: ['', Validators.required],
    rarity: [Rarities.Common, [Validators.required]],
    price: [0, [Validators.min(0), Validators.required]]
  })


  submit(event : Event){
    event.preventDefault();
    console.log(this.itemFormGroup.value);
  }

  isFieldValid(fieldName : string){
    const formControl = this.itemFormGroup.get(fieldName);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: any){
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.itemFormGroup.patchValue({
          image: reader.result as string
        });
      };
    }
  }

}
