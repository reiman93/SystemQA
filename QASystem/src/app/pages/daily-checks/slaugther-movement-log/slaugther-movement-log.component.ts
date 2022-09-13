
import { Component, Input, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { SlaughterMovementLogService } from '../../../services/daily-checks/slaughter-movement-log.service';

@Component({
  selector: 'app-slaugther-movement-log',
  templateUrl: './slaugther-movement-log.component.html',
  styleUrls: ['./slaugther-movement-log.component.scss']
})
export class SlaugtherMovementLogComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";

  @Input() period: string = '';
  nameQA!: string;
  foto!: string;

  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    date: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(50),
      ],
      updateOn: 'change',
    }),

    begining_carcase: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    ending_carcase: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),

    no30: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),

    definition: new FormControl(false, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),

    supplier: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    lot_num: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    num_carcase: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: SlaughterMovementLogService,
    private snakBarService: SnakBarService
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto
  }

  /* MAIN FORM FORM CONTROLS */

  get dateControl() {
    return this.mainForm.get('date');
  }

  get beginingControl() {
    return this.mainForm.get('begining_carcase');
  }
  get endingControl() {
    return this.mainForm.get('ending_carcase');
  }
  get no30Control() {
    return this.mainForm.get('no30');
  }
  get definitionControl() {
    return this.mainForm.get('definition');
  }
  get supplierControl() {
    return this.mainForm.get('supplier');
  }
  get lotControl() {
    return this.mainForm.get('lot_num');
  }
  get numCarcaseControl() {
    return this.mainForm.get('num_carcase');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        date: this.dateControl ?.value as string,
        beginig_carcase_tag: this.beginingControl ?.value as string,
        monitored_by: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        ending_carcase_tag: this.endingControl ?.value as string,
        no30: this.no30Control ?.value as string,
        definition: this.definitionControl ?.value as boolean,
        supplier_name: this.supplierControl ?.value as string,
        lot_num: this.lotControl ?.value as number,
        carcases_grag_tag_num: this.numCarcaseControl ?.value as number,
      }, 'slaugther-movement-log')
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


