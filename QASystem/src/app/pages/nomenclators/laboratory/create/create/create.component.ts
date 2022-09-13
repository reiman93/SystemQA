import { Component, OnInit } from '@angular/core';
import {
      AbstractControl,
      AsyncValidatorFn,
      FormControl,
      FormGroup,
      ValidationErrors,
      ValidatorFn,
      Validators,
} from '@angular/forms';

import { Location } from '@angular/common';
import { LaboratoryService } from '../../../../../services/nomenclators/laboratory.service'

import { SnakBarService } from '../../../../../components/snack-bar/snak-bar.service';

@Component({
      selector: 'app-create',
      templateUrl: './create.component.html',
      styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

      requiredField: string = "Required field.";
      maxField: string = "Max characters allowed.";
      numberField: string = "Only allowed numbers.";

      user !: string;
      pass !: string;
      type!: any[];


      videoForm = new FormGroup({
            name: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(50),
                  ],
                  updateOn: 'change',
            }),
            address: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(150),
                  ],
                  updateOn: 'change',
            }),
            phone: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(6),
                        this.isNumberValidation()
                  ],
                  updateOn: 'change',
            }),
            gmail: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.email,
                  ],
                  updateOn: 'change',
            })
      });

      constructor(
            private location: Location,
            private servicio: LaboratoryService,
            private snakBarService: SnakBarService,
      ) { }

      ngOnInit(): void {
      }



      get nameControl() {
            return this.videoForm.get('name');
      }

      get addressControl() {
            return this.videoForm.get('address');
      }
      get phoneControl() {
            return this.videoForm.get('phone');
      }
      get gmailControl() {
            return this.videoForm.get('gmail');
      }

      returnToList(): void {
            this.location.back();
      }

      submitForm(): void {
            console.warn("valido??", this.videoForm.valid)
            if (this.videoForm.valid) {
                  this.servicio.create(this.videoForm.value, 'laboratory')
                        .subscribe(
                              {
                                    next: (result: any) => {
                                          this.snakBarService.openSnackBar('Successfully created', 'Close');
                                          this.returnToList();
                                    },
                                    error: (error: any) => {
                                          this.snakBarService.openSnackBar(
                                                'Error creating data.',
                                                'cerrar',
                                                {},
                                                'error'
                                          );
                                    },
                                    complete: () => console.info('complete')
                              }
                        );
            }
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

}
