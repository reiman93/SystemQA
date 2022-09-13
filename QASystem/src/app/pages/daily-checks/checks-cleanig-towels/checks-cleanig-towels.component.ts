import { Component, Input, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { ChecksCleanigTowelsService } from '../../../services/daily-checks/checks-cleanig-towels.service';

@Component({
  selector: 'app-checks-cleanig-towels',
  templateUrl: './checks-cleanig-towels.component.html',
  styleUrls: ['./checks-cleanig-towels.component.scss']
})
export class ChecksCleanigTowelsComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";

  @Input() period: string = '';
  nameQA!: string;
  foto!: string;

  radio!: string;

  options = [
    {
      value: false,
      name: 'Inaceptable',
      controlName: 'aceptable',
    },
    {
      value: true,
      name: 'Aceptable',
      controlName: 'aceptable',
    },
  ];

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
    woman: new FormControl(false, {
      validators: [
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    man: new FormControl(false, {
      validators: [
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    aceptable: new FormControl(false, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    corrective_actions: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
  });
  /* ******************* */
  constructor(
    private servicio: ChecksCleanigTowelsService,
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
  get timeControl() {
    return this.mainForm.get('time');
  }

  get manControl() {
    return this.mainForm.get('man');
  }
  get womanControl() {
    return this.mainForm.get('woman');
  }
  get acceptControl() {
    return this.mainForm.get('aceptable');
  }

  get shiftControl() {
    return this.mainForm.get('shift');
  }
  get correctiveControl() {
    return this.mainForm.get('corrective_actions');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    console.warn(this.mainForm.valid)
    if (this.mainForm.valid) {
      this.servicio.create(this.mainForm.value, 'area')
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

  radioChange(event: any) {
    this.radio = event.value;
  }
  /* ******************* */

}


