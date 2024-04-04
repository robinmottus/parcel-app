import { Pipe, PipeTransform } from '@angular/core';
import {Parcel} from "./app.component";

@Pipe({
  name: 'orderBy',
  standalone: true
})
export class OrderByPipe implements PipeTransform {

  transform(value: Parcel[], order: ["country", "asc"]): Parcel[] {
    return value.sort((a, b) => {
      if (a.country === "Estonia" && b.country !== "Estonia") {
        return -1;
      } else if (a.country === "Estonia" && b.country === "Estonia") {
        return new Date(a.date).getDate() - new Date(b.date).getDate();
      }
      else {
        return new Date(b.date).getDate() - new Date(a.date).getDate();
      }
    });
  }
}
