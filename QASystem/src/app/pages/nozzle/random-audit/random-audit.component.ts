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
  selector: 'app-random-audit',
  templateUrl: './random-audit.component.html',
  styleUrls: ['./random-audit.component.scss']
})
export class RandomAuditComponent implements OnInit {

  requiredField: string = "Required field";
  maxField: string = "Max characters allowed.";

  nameQA!: string;
  foto!: string;

  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    random_time: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    date: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    verification_type: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    random_code: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    random_num: new FormControl(null, {
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
  }

  /* MAIN FORM FORM CONTROLS */
  get timeControl() {
    return this.mainForm.get('random_time');
  }
  get dateControl() {
    return this.mainForm.get('date');
  }
  get verificationControl() {
    return this.mainForm.get('verification_type');
  }
  get numnControl() {
    return this.mainForm.get('random_num');
  }
  get codeControl() {
    return this.mainForm.get('random_code');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        monitor_user_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        date: this.dateControl ?.value as string,
        random_num: this.numnControl ?.value as string,
        random_time: this.timeControl ?.value as string,
        random_code: this.codeControl ?.value as string,
        verification_type: this.verificationControl ?.value as string,
      }, 'random-audit')
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

}

