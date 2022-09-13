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
import { SampleRequestTypeService } from '../../../../../services/nomenclators/sample-request-type.service';

//import { ScreenService } from '../../../../services/screen.service';
import { SnakBarService } from '../../../../../components/snack-bar/snak-bar.service';

@Component({
      selector: 'app-create',
      templateUrl: './create.component.html',
      styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

      requiredField: string = "Required field.";
      maxField: string = "Max characters allowed.";

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
            description: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(150),
                  ],
                  updateOn: 'change',
            })
      });

      constructor(
            private location: Location,
            private servicio: SampleRequestTypeService,
            private snakBarService: SnakBarService,
      ) { }

      ngOnInit(): void {
      }



      get nameControl() {
            return this.videoForm.get('name');
      }

      get descControl() {
            return this.videoForm.get('description');
      }

      returnToList(): void {
            this.location.back();
      }

      submitForm(): void {
            if (this.videoForm.valid) {
                  this.servicio.create(this.videoForm.value, 'sample-request-type')
                        .subscribe(
                              {
                                    next: (result: any) => {
                                          this.snakBarService.openSnackBar('Successfully created', 'Close');

                                    },
                                    error: (error: any) => {
                                          this.snakBarService.openSnackBar(
                                                'Error creating data.',
                                                'cerrar',
                                                {},
                                                'error'
                                          );
                                    },
                                    complete: () => { this.returnToList(); }
                              }
                        );
            }
      }

}
