import { Component, Input, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { IForm } from 'src/app/interfaces/IObject';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { ReserveOutService } from '../../../services/nozle/reserve-out.service';


@Component({
  selector: 'app-reserve-out',
  templateUrl: './reserve-out.component.html',
  styleUrls: ['./reserve-out.component.scss']
})
export class ReserveOutComponent implements OnInit {

  requiredField: string = "Required field";
  maxField: string = "Max characters allowed.";

  nameQA!: string;
  foto!: string;
  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    date: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    shift: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    carcasse_number: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    reason: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    time_out: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    time_checked: new FormControl(null, {
      validators: [
       // this.isNumberValidation()
      ],
      updateOn: 'change',
    }),
    dropped_carcass: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    min_45: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    may_45: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    zero_tolerance: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: ReserveOutService,
    private snakBarService: SnakBarService
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name;
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto;
  }

  /* MAIN FORM FORM CONTROLS */
  get dateControl() {
    return this.mainForm.get('date');
  }
  get shiftControl() {
    return this.mainForm.get('shift');
  }
  get carcasseControl() {
    return this.mainForm.get('carcasse_number');
  }
  get reasonControl() {
    return this.mainForm.get('reason');
  }
  get timeOutControl() {
    return this.mainForm.get('time_out');
  }
  get timeCheckControl() {
    return this.mainForm.get('time_checked');
  }
  get droopControl() {
    return this.mainForm.get('dropped_carcass');
  }
  get min_45Control() {
    return this.mainForm.get('min_45');
  }
  get may_45Control() {
    return this.mainForm.get('may_45');
  }
  get zeroControl() {
    return this.mainForm.get('zero_tolerance');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        auditor_id_user: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        date: this.dateControl ?.value as string,
        shift: this.shiftControl ?.value as string,
        carcasse_ID_number: this.carcasseControl ?.value as string,
        reason: this.reasonControl ?.value as string,
        time_out: this.timeOutControl ?.value as string,
        time_checked: this.timeCheckControl ?.value as string,
        dropped_carcass: this.droopControl ?.value as string,
        min_45: this.min_45Control ?.value as string,
        may_45: this.may_45Control ?.value as string,
        zero_tolerance: this.zeroControl ?.value as string,
      }, 'reserve-out')
        .subscribe(
          {
            next: (result: any) => {
              this.snakBarService.openSnackBar('Successfully created', 'Close');
            },
            error: (error: any) => {
              this.snakBarService.openSnackBar(
                'Error creating data.',
                'Close',
                {},
                'error'
              );
            },
            complete: () => { }
          }
        );
    }
  }
  /* ******************* */

  /* MAIN FORM FORM RESET */
  clearForm() {
    this.mainForm.reset();
  }

  private isNumberValidation(): ValidatorFn {
    return function (control: AbstractControl) {
      if (control.value !== null && isNaN(+ control.value)) {
        return { notNumber: true };
      } else {
        return null;
      }
    };
  }
  /* ******************* */

}

