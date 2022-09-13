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



@Component({
  selector: 'app-sop-suplement',
  templateUrl: './sop-suplement.component.html',
  styleUrls: ['./sop-suplement.component.scss']
})
export class SopSuplementComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";

  @Input() period!: string;
  @Input() type!: IType[];
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

    defect: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),

    disposition: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    restoration: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    root: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    further: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    prod: new FormControl(null, {
      validators: [
        Validators.required,
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
    private snakBarService: SnakBarService
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name;
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto;
    this.getAllAction();
    this.getAllPreventive();
  }

  /* MAIN FORM FORM CONTROLS */
  get dateControl() {
    return this.mainForm.get('date');
  }
  get defectControl() {
    return this.mainForm.get('defect');
  }
  get dispositionControl() {
    return this.mainForm.get('disposition');
  }
  get restorationControl() {
    return this.mainForm.get('restoration');
  }
  get rootControl() {
    return this.mainForm.get('root');
  }
  get furtherControl() {
    return this.mainForm.get('further');
  }
  get prodControl() {
    return this.mainForm.get('prod');
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

  getAllPreventive() {
    this.servicioPreventive.getAll('preventive_action')
      .subscribe({
        next: (data: any) => {
          this.dataPreventive = data.data;
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


  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create(
        {
          date: this.dateControl ?.value as string,
          verifyed_by: JSON.parse(sessionStorage.getItem('currentUser')!).username,
          decfects_description: this.defectControl ?.value as string,
          disposition_of_product: this.dispositionControl ?.value as string,
          restoration_sanitary_condition: this.restorationControl ?.value as boolean,
          root_cause: this.rootControl ?.value as string,
          Further_planned_actions: this.furtherControl ?.value as string,
          prod_usage_kill_box: this.prodControl ?.value as string
        }, 'sop-suplements')
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

