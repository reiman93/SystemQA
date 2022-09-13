import { Component, Input, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { SopLogsService } from '../../../services/sop-logs.service';
import { ActionsService } from '../../../services/nomenclators/actions.service';
import { PreventiveActionsService } from 'src/app/services/nomenclators/preventive-actions.service';
import { IType } from 'src/app/interfaces/IObject';

import { Router } from '@angular/router';



@Component({
  selector: 'app-sop-genirc-log',
  templateUrl: './sop-genirc-log.component.html',
  styleUrls: ['./sop-genirc-log.component.scss']
})
export class SopGenircLogComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";

  @Input() period!: string;
  @Input() type!: IType[];
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

    day_hours: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),

    status: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    type_inform: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    preventive_action: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    corrective_action: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    })
  });
  dataAction: any;
  dataPreventive: any;
  /* ******************* */
  constructor(
    private servicio: SopLogsService,
    private servicioAction: ActionsService,
    private servicioPreventive: PreventiveActionsService,
    private snakBarService: SnakBarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name;
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto;
    this.getAllAction();
    this.getAllPreventive();
  }

  /* MAIN FORM FORM CONTROLS */
  get timeControl() {
    return this.mainForm.get('time');
  }
  get dateControl() {
    return this.mainForm.get('date');
  }
  get statusControl() {
    return this.mainForm.get('status');
  }
  get typeControl() {
    return this.mainForm.get('type_inform');
  }
  get dayControl() {
    return this.mainForm.get('day_hours');
  }
  get correctiveControl() {
    return this.mainForm.get('corrective_action');
  }
  get preventiveControl() {
    return this.mainForm.get('preventive_action');
  }
  /* ******************* */
  goTo(target: string) {
    this.router.navigate(['pages/nomenclators/' + target + '/create']);
  }

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

  getAllPreventive() {
    this.servicioPreventive.getAll('preventive_action')
      .subscribe({
        next: (data: any) => {
          this.dataPreventive = data.data;
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
      this.servicio.create(
        {
          date: this.dateControl?.value as string,
          verifyed_by: JSON.parse(sessionStorage.getItem('currentUser')!).username,
          time: this.timeControl?.value as string,
          inform_type: this.typeControl?.value as string,
          periodo: this.period,
          day_hours: this.dayControl?.value as string,
          status: this.statusControl?.value as string,
          corrective_action: this.correctiveControl?.value as number,
          preventive_action: this.preventiveControl?.value as number
        }, 'sop-log')
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

