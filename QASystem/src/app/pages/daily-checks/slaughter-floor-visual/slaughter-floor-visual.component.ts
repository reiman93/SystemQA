
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

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { SlaughterFloorVisualService } from '../../../services/daily-checks/slaughter-floor-visual.service';

@Component({
  selector: 'app-slaughter-floor-visual',
  templateUrl: './slaughter-floor-visual.component.html',
  styleUrls: ['./slaughter-floor-visual.component.scss']
})
export class SlaughterFloorVisualComponent implements OnInit {

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
    specific_job: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(10),
      ],
      updateOn: 'change',
    }),
    sanitary_conditions: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(10),
      ],
      updateOn: 'change',
    }),
    pass_or_fails: new FormControl(false, {
      validators: [
        Validators.required,
        Validators.maxLength(10),
      ],
      updateOn: 'change',
    }),
    chain_speed: new FormControl(false, {
      validators: [
        Validators.required,
        Validators.maxLength(10),
      ],
      updateOn: 'change',
    }),
    two_nife: new FormControl(false, {
      validators: [
        Validators.required,
        Validators.maxLength(10),
      ],
      updateOn: 'change',
    }),
    reductions: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: SlaughterFloorVisualService,
    private snakBarService: SnakBarService
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto
  }

  /* MAIN FORM FORM CONTROLS */

  get jobControl() {
    return this.mainForm.get('specific_job');
  }
  get sanitaryControl() {
    return this.mainForm.get('sanitary_conditions');
  }
  get dateControl() {
    return this.mainForm.get('date');
  }

  get reducControl() {
    return this.mainForm.get('reductions');
  }
  get nifeControl() {
    return this.mainForm.get('two_nife');
  }
  get speedControl() {
    return this.mainForm.get('chain_speed');
  }
  get passControl() {
    return this.mainForm.get('pass_or_fails');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        date: this.dateControl ?.value as string,
        qa_user_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        reduction_comments: this.reducControl ?.value as string,
        specific_job: this.jobControl ?.value as string,
        sanitary_conditions: this.sanitaryControl ?.value as string,
        pass_or_fails: this.passControl ?.value as string,
        chain_speed: this.speedControl ?.value as string,
        two_nife: this.nifeControl ?.value as number,
        period: this.period,
      }, 'slaugther-visual-floor')
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

