import {Directive, forwardRef, Injectable, Input} from "@angular/core";
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {ParcelsService} from "../parcels.service";

@Injectable({ providedIn: 'root' })
export class UniqueParcelSkuValidator implements AsyncValidator {
  constructor(private parcelService: ParcelsService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.parcelService.checkForDuplicateSku(control.value).pipe(
      map((unique) => (unique ? { uniqueSku: false } : null)),
      catchError(() => of(null)),
    );
  }
}

@Directive({
  selector: '[uniqueSku]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueSkuValidatorDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class UniqueSkuValidatorDirective implements AsyncValidator {
  constructor(private validator: UniqueParcelSkuValidator) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
