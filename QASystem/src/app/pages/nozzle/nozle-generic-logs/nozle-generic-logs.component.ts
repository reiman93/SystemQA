import { Component, Input, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IForm } from 'src/app/interfaces/IObject';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { RandomAuditService } from '../../../services/nozle/random-audit.service';


@Component({
  selector: 'app-nozle-generic-logs',
  templateUrl: './nozle-generic-logs.component.html',
  styleUrls: ['./nozle-generic-logs.component.scss']
})
export class NozleGenericLogsComponent implements OnInit {

  requiredField: string = "Required field";
  maxField: string = "Max characters allowed.";

  @Input() period: string = '';
  @Input() fields!: IForm[];
  @Input() params!: any;
  @Input() service: string = '';
  nameQA!: string;
  foto!: string;

  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    time: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    date: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: RandomAuditService,
    private snakBarService: SnakBarService
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name;
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto;
    this.addInputControl();
  }

  /* MAIN FORM FORM CONTROLS */
  get timeControl() {
    return this.mainForm.get('time');
  }
  get dateControl() {
    return this.mainForm.get('date');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        monitor_user_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        date: this.dateControl ?.value as string,
        random_num: this.mainForm.get('random_num') ?.value as string,
        randomcode: this.mainForm.value.randomcode as string,
        verification_type: this.mainForm.get('verification_type') ?.value as string,
      }, this.service)
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
  /* ******************* */

  /* MAIN FORM FORM DYNAMIC FIELDS */
  addInputControl() {
    let abstControl = new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    });
    let abstControl2 = new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    });
    this.fields.forEach((val: any, index) => {
      if (val.type == 'check') {
        this.mainForm.addControl(val.name, abstControl2);
      } else {
        this.mainForm.addControl(val.name, abstControl);
      }
    });
  }

  /* ******************* */

}

