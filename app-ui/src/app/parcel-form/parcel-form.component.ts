import {JsonPipe, NgFor, NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import {ParcelsService} from "../parcels.service";
import {Parcel} from "../app.component";
import {UniqueParcelSkuValidator, UniqueSkuValidatorDirective} from "./unique-parcel-sku-validator.service";

@Component({
  standalone: true,
  selector: 'parcel-form',
  templateUrl: './parcel-form.component.html',
  imports: [NgFor, NgIf, ReactiveFormsModule, JsonPipe, UniqueSkuValidatorDirective],
})
export class ParcelFormComponent implements OnInit {
  parcelForm = this.formBuilder.group({
    sku: ['', {
      asyncValidators: [
        this.parcelSkuValidator.validate.bind(this.parcelSkuValidator),
      ],
      updateOn: 'blur',
    }, Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    town: ['', Validators.required],
    country: ['', Validators.required],
    date: ['', Validators.required],
  });
  parcels: Parcel[] = [];

  ngOnInit() {
    this.parcelForm.reset();
  }

  constructor(
    private parcelsService: ParcelsService,
    private formBuilder: FormBuilder,
    private parcelSkuValidator: UniqueParcelSkuValidator
  ) {
    this.parcels = [];
  }

  addParcel(parcel: Parcel) {
    this.parcelsService.addParcel(parcel).subscribe();
    this.parcelForm.reset();
  }

  onSubmit() {
    let parcel = {
      sku: this.parcelForm.value.sku || '',
      description: this.parcelForm.value.description || '',
      address: this.parcelForm.value.address || '',
      town: this.parcelForm.value.town || '',
      country: this.parcelForm.value.country || '',
      date: this.parcelForm.value.date || ''
    }
    this.addParcel(parcel);
  }

  get sku() {
    return this.parcelForm.get('sku')!;
  }
}
