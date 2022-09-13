import { Component, Input, OnInit } from '@angular/core';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { KillFloorTempService } from '../../../services/daily-checks/kill-floor-temp.service';
import { ActionsService } from '../../../services/nomenclators/actions.service';

@Component({
  selector: 'app-wr-kill-floor',
  templateUrl: './wr-kill-floor.component.html',
  styleUrls: ['./wr-kill-floor.component.scss']
})
export class WrKillFloorComponent implements OnInit {

  requiredField: string = "Required field";
  maxField: string = "Max characters allowed.";

  @Input() period: string = '';
  nameQA!: string;
  foto!: string;
  dataAction: any;

  /* MAIN FORM FORM */
  wrKillFloorForm = new FormGroup({
    location: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(50),
      ],
      updateOn: 'change',
    }),
    date: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    time: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    temperature: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    notes: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    /*     period: new FormControl([
          { 'period-1': 'Period 1' },
          { 'period-2': 'Period 2' },
          { 'period-3': 'Period 3' },
        ], {
            validators: [
              Validators.required,
            ],
            updateOn: 'change',
          }), */
    corrective_action: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: KillFloorTempService,
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
  get locationControl() {
    return this.wrKillFloorForm.get('location');
  }
  get dateControl() {
    return this.wrKillFloorForm.get('date');
  }
  get timeControl() {
    return this.wrKillFloorForm.get('time');
  }
  get tempControl() {
    return this.wrKillFloorForm.get('temperature');
  }
  get notesControl() {
    return this.wrKillFloorForm.get('notes');
  }
  get correctiveControl() {
    return this.wrKillFloorForm.get('corrective_action');
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
  submitWrKillFloorForm(): void {
    if (this.wrKillFloorForm.valid) {
      this.servicio.create({
        date: this.dateControl ?.value as string,
        time: this.timeControl ?.value as string,
        auditor_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        notes: this.notesControl ?.value as string,
        locations: this.locationControl ?.value as string,
        temperature: this.tempControl ?.value as number,
        periodo: this.period,
        relapse_actions_id: this.correctiveControl ?.value as number,
      }, 'kill-floor-temp')
        .subscribe(
          {
            next: (result: any) => {
              this.snakBarService.openSnackBar('Successfully created', 'Close');
              this.clearWrKillForm()
            },
            error: (error: any) => {
              console.warn("que pasa", error)
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
  clearWrKillForm() {
    this.wrKillFloorForm.reset();
  }
  /* ******************* */
  goTo(target: string) {
    this.router.navigate(['pages/nomenclators/' + target + '/create']);
  }
}
