

import { Component, Input, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { VisualSpinalCordService } from '../../../services/daily-checks/visual-spinal-cord.service';

@Component({
  selector: 'app-spinal-cord-sheath',
  templateUrl: './spinal-cord-sheath.component.html',
  styleUrls: ['./spinal-cord-sheath.component.scss']
})
export class SpinalCordSheathComponent implements OnInit {

  requiredField: string = "Campo requerido";
  @Input() period: string = '';
  nameQA!: string;
  foto!: string;

  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    date: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),

    carcase: new FormControl(null, {
      validators: [
        Validators.required
      ],
      updateOn: 'change',
    }),

    removed: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),

    notified: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),

    slaugther: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: VisualSpinalCordService,
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
  get removedControl() {
    return this.mainForm.get('removed');
  }
  get carcaseControl() {
    return this.mainForm.get('carcase');
  }
  get notifiedControl() {
    return this.mainForm.get('notified');
  }
  get slaugtherControl() {
    return this.mainForm.get('slaugther');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create(
        {
          qa_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
          date: this.dateControl ?.value as string,
          carcase: this.carcaseControl ?.value as number,
          removed: this.removedControl ?.value as boolean,
          slaugther_cooler_supy: this.slaugtherControl ?.value as boolean,
          qa_notified: this.notifiedControl ?.value as boolean
        }, 'visual-spinal-cord')
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


