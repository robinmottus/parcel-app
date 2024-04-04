import {Component, OnInit} from "@angular/core";
import {JsonPipe, NgFor} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ParcelsService} from "../parcels.service";
import {Parcel} from "../app.component";
import {OrderByPipe} from "../order-by.pipe";

@Component({
  standalone: true,
  selector: 'parcel-list',
  templateUrl: './parcel-list.component.html',
  imports: [NgFor, ReactiveFormsModule, JsonPipe, FormsModule, OrderByPipe],
})
export class ParcelListComponent implements OnInit {
  parcels: Parcel[];
  country: '';
  description: '';

  constructor(
    private parcelsService: ParcelsService,
  ) {
    this.parcels = [];
    this.country = '';
    this.description = '';
  }
  ngOnInit() {
    this.getParcels();
  }

  getParcels() {
    this.parcelsService.getParcels().subscribe((data) => {
      this.parcels = data as Parcel[];
    });
  }

  filterParcels(country: string, description: string) {
      this.parcelsService
        .filterParcels(country, description)
        .subscribe((data) => {
          this.parcels = data as Parcel[];
        });
      this.country = '';
      this.description = '';
  }
}
