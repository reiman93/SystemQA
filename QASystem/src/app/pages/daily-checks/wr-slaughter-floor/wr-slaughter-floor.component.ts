
import { Component, Input, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { SlaughterFloorGattleService } from '../../../services/daily-checks/wr-slaughter-floor.service';

@Component({
  selector: 'app-wr-slaughter-floor',
  templateUrl: './wr-slaughter-floor.component.html',
  styleUrls: ['./wr-slaughter-floor.component.scss']
})
export class WrSlaughterFloorComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";

  @Input() period: string = '';
  nameQA!: string;
  foto!: string;

  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    time: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(50),
      ],
      updateOn: 'change',
    }),
    date: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(50),
      ],
      updateOn: 'change',
    }),

    carcass: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    state: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),

    equipment_cleaned: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: SlaughterFloorGattleService,
    private snakBarService: SnakBarService
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto
  }

  /* MAIN FORM FORM CONTROLS */
  get timeControl() {
    return this.mainForm.get('time');
  }
  get dateControl() {
    return this.mainForm.get('date');
  }
  get stateControl() {
    return this.mainForm.get('state');
  }
  get carcassControl() {
    return this.mainForm.get('carcass');
  }
  get equipmentControl() {
    return this.mainForm.get('equipment_cleaned');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create(
        {
          date: this.dateControl ?.value as string,
          monitored_by: JSON.parse(sessionStorage.getItem('currentUser')!).username,
          time: this.timeControl ?.value as string,
          state: this.stateControl ?.value as string,
          carcass_num_age: this.carcassControl ?.value as string,
          equipment_cleaned_and_sterilized: this.equipmentControl ?.value as string
        }, 'slaugther-floor-gattle')
        .subscribe(
          {
            next: (result: any) => {
              this.snakBarService.openSnackBar('Successfully created', 'Close');
              this.clearForm()
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
  /* ******************* */

}

