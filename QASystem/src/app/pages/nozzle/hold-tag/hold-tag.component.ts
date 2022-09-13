import { Component, Input, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IForm } from 'src/app/interfaces/IObject';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { HoldTagService } from '../../../services/nozle/hold-tag.service';


@Component({
  selector: 'app-hold-tag',
  templateUrl: './hold-tag.component.html',
  styleUrls: ['./hold-tag.component.scss']
})
export class HoldTagComponent implements OnInit {

  requiredField: string = "Required field";
  maxField: string = "Max characters allowed.";

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
    shift: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    initials: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    reason: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150)
      ],
      updateOn: 'change',
    }),
    tag: new FormControl(null, {
      validators: [
        Validators.required,
        this.isNumberValidation()
      ],
      updateOn: 'change',
    }),
    product: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    tag_pulled: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: HoldTagService,
    private snakBarService: SnakBarService
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name;
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto;
  }

  /* MAIN FORM FORM CONTROLS */
  get dateControl() {
    return this.mainForm.get('date');
  }
  get shiftControl() {
    return this.mainForm.get('shift');
  }
  get initialsControl() {
    return this.mainForm.get('initials');
  }
  get reasonControl() {
    return this.mainForm.get('reason');
  }
  get tagControl() {
    return this.mainForm.get('tag');
  }
  get productControl() {
    return this.mainForm.get('product');
  }
  get tagPulledControl() {
    return this.mainForm.get('tag_pulled');
  }
  /* ******************* */
  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        verifyed_by: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        date: this.dateControl ?.value as string,
        shift: this.shiftControl ?.value as string,
        initials: this.initialsControl ?.value as string,
        tag: this.tagControl ?.value as string,
        reason_tag_was_written: this.reasonControl ?.value as string,
        product_disposition: this.productControl ?.value as string,
        tag_pulled: this.tagPulledControl ?.value as string,
      }, 'hold-tag')
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

  private isNumberValidation(): ValidatorFn {
    return function (control: AbstractControl) {
      if (control.value !== null && isNaN(+ control.value)) {
        return { notNumber: true };
      } else {
        return null;
      }
    };
  }
  /* ******************* */

}

