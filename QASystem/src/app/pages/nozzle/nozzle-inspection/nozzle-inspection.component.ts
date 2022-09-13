import { Component, Input, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IForm } from 'src/app/interfaces/IObject';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { NozzleInspectionService } from '../../../services/nozle/nozzle-inspection.service';


@Component({
  selector: 'app-nozzle-inspection',
  templateUrl: './nozzle-inspection.component.html',
  styleUrls: ['./nozzle-inspection.component.scss']
})
export class NozzleInspectionComponent implements OnInit {

  requiredField: string = "Required field";
  maxField: string = "Max characters allowed.";

  nameQA!: string;
  foto!: string;
  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    date: new FormControl(null, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    }),
    time: new FormControl(null, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    }),
    process: new FormControl(null, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    }),
    period: new FormControl(null, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    }),
    lactic_mp3: new FormControl(false, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    }),
    nozzals_working: new FormControl(false, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    }),
    plugged_nozzles: new FormControl(false, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    }),
    propper_aplications: new FormControl(false, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    }),
    product_sprend_out: new FormControl(false, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: NozzleInspectionService,
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
  get timeControl() {
    return this.mainForm.get('time');
  }
  get processControl() {
    return this.mainForm.get('process');
  }
  get periodControl() {
    return this.mainForm.get('period');
  }
  get lacticControl() {
    return this.mainForm.get('lactic_mp3');
  }
  get nozzalsControl() {
    return this.mainForm.get('nozzals_working');
  }
  get pluggedControl() {
    return this.mainForm.get('plugged_nozzles');
  }
  get propperControl() {
    return this.mainForm.get('propper_aplications');
  }
  get productControl() {
    return this.mainForm.get('product_sprend_out');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        auditor: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        date: this.dateControl ?.value as string,
        time: this.timeControl ?.value as string,
        process: this.processControl ?.value as string,
        period: this.periodControl ?.value as number,
        lactic_mp3: this.lacticControl ?.value as boolean,
        nozzals_working: this.nozzalsControl ?.value as boolean,
        plugged_nozzles: this.pluggedControl ?.value as boolean,
        propper_alications: this.propperControl ?.value as boolean,
        product_sprend_out: this.productControl ?.value as boolean,
      }, 'nozzle-inspection')
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

