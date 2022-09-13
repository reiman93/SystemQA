import { Component, Input, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';
import { ChlorineNozzleService } from '../../../services/nozle/chlorine-nozzle.service';


@Component({
  selector: 'app-chlorine-nozzle',
  templateUrl: './chlorine-nozzle.component.html',
  styleUrls: ['./chlorine-nozzle.component.scss']
})
export class ChlorineNozzleComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";
  notNumberField: string = "Only allowed numbers";

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
    action: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    period: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    clorine: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    sanitary_conditions: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    nozzles_working: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    flugged_nozzels: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    barrel_checked: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    chlorine_added: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    comments: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: ChlorineNozzleService,
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
  get periodControl() {
    return this.mainForm.get('period');
  }
  get actionControl() {
    return this.mainForm.get('action');
  }
  get clorineControl() {
    return this.mainForm.get('clorine');
  }
  get sanitaryControl() {
    return this.mainForm.get('sanitary_conditions');
  }
  get nozzlesControl() {
    return this.mainForm.get('nozzles_working');
  }
  get fluggedControl() {
    return this.mainForm.get('flugged_nozzels');
  }
  get barrelControl() {
    return this.mainForm.get('barrel_checked');
  }
  get addedControl() {
    return this.mainForm.get('chlorine_added');
  }
  get commentsControl() {
    return this.mainForm.get('comments');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        auditor_user_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        date: this.dateControl ?.value as string,
        time: this.timeControl ?.value as string,
        action: this.actionControl ?.value as string,
        period: this.periodControl ?.value as number,
        clorine: this.clorineControl ?.value as string,
        sanitary_conditions: this.sanitaryControl ?.value as number,
        nozzels_working_propiety: this.nozzlesControl ?.value as boolean,
        flugged_nozzels: this.fluggedControl ?.value as boolean,
        barrel_checked: this.barrelControl ?.value as boolean,
        chlorine_added: this.addedControl ?.value as boolean,
        comments: this.commentsControl ?.value as boolean,
      }, 'chlorine-nozzle')
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

