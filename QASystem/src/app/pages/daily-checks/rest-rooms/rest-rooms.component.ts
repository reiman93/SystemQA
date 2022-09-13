import { Component, Input, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { RestRoomService } from '../../../services/daily-checks/rest-room.service';
import { ActionsService } from '../../../services/nomenclators/actions.service';

@Component({
  selector: 'app-rest-rooms',
  templateUrl: './rest-rooms.component.html',
  styleUrls: ['./rest-rooms.component.scss']
})
export class RestRoomsComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";

  @Input() period: string = '';
  nameQA!: string;
  foto!: string;

  radio!: string;
  dataAction: any;

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

    sex: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    state: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    shift: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    corrective_actions: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
  });
  /* ******************* */
  constructor(
    private servicio: RestRoomService,
    private snakBarService: SnakBarService,
    private servicioAction: ActionsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name;
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto;
    this.getAllAction();
  }

  /* MAIN FORM FORM CONTROLS */
  get dateControl() {
    return this.mainForm.get('date');
  }
  get timeControl() {
    return this.mainForm.get('time');
  }

  get sexControl() {
    return this.mainForm.get('sex');
  }

  get stateControl() {
    return this.mainForm.get('state');
  }

  get shiftControl() {
    return this.mainForm.get('shift');
  }
  get correctiveControl() {
    return this.mainForm.get('corrective_actions');
  }
  /* ******************* */

  getAllAction() {
    this.servicioAction.getAll('relapse_action')
      .subscribe({
        next: (data: any) => {
          this.dataAction = data.data;
        },
        error: (error: any) => {
          this.snakBarService.openSnackBar(
            'Error getting data.',
            'Close',
            {},
            'error'
          );
        },
        complete: () => { }
      }
      );
  }
  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        auditor: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        date: this.dateControl ?.value as string,
        time: this.timeControl ?.value as string,
        shift: this.shiftControl ?.value as string,
        state: this.stateControl ?.value as string,
        sex: this.sexControl ?.value as boolean,
        corrective_action: this.correctiveControl ?.value as number
      }, 'rest-room')
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

  radioChange(event: any) {
    this.radio = event.value;
  }
  goTo(target: string) {
    this.router.navigate(['pages/nomenclators/' + target + '/create']);
  }
  /* ******************* */

}

