
import { Component, Input, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { SpinaCoordService } from '../../../services/daily-checks/spinal-coord.service';

@Component({
  selector: 'app-wr-spinal-cord',
  templateUrl: './wr-spinal-cord.component.html',
  styleUrls: ['./wr-spinal-cord.component.scss']
})
export class WrSpinalCordComponent implements OnInit {

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
    aceptavol_value: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    comments: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    inked_missplits: new FormControl(false, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: SpinaCoordService,
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
  get aceptControl() {
    return this.mainForm.get('aceptavol_value');
  }

  get inkendControl() {
    return this.mainForm.get('inked_missplits');
  }
  get commentsControl() {
    return this.mainForm.get('comments');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    console.warn("QUE REPINGA PASA AKI",this.mainForm.valid)
    console.warn("QUE REPINGA PASA AKI",this.mainForm.get('date')?.value)
    console.warn("QUE REPINGA PASA AKI",this.mainForm.get('aceptavol_value')?.value)
    console.warn("QUE REPINGA PASA AKI",this.mainForm.get('inked_missplits')?.value)
    console.warn("QUE REPINGA PASA AKI",this.mainForm.get('comments')?.value)
    if (this.mainForm.valid) {
      this.servicio.create({
        users_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        date: this.dateControl?.value as string,
        period: this.period,
        aceptavol_value: this.aceptControl?.value as boolean,
        unaceptavol_value: !this.aceptControl?.value as boolean,
        comments: this.commentsControl?.value as string,
        inked_missplits: this.inkendControl?.value as string
      }, 'spinal-cord-audit')
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

  toggle(event: MatSlideToggleChange) {
    /* if (event.checked) {
       this.unaceptControl ?.setValue(false);
       this.aceptControl ?.setValue(true);
     }else{
       this.aceptControl ?.setValue(false);
       this.unaceptControl ?.setValue(true);
     }*/
  }
}

