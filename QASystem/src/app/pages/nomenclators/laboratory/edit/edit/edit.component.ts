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
import { ActivatedRoute, Router } from '@angular/router';
import { SnakBarService } from '../../../../../components/snack-bar/snak-bar.service';

@Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html',
        styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

        requiredField: string = "Required field.";
        maxField: string = "Max characters allowed.";
        numberField: string = "Only allowed numbers.";

        id !: any;
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
                private route: ActivatedRoute,
                private snakBarService: SnakBarService,
        ) { }

        ngOnInit(): void {
                this.findById();
        }

        findById() {
                this.id = this.route.snapshot.paramMap.get('id');
                this.servicio.get(this.id, "laboratory").subscribe((result: any) => {
                       console.warn("este es el formData",result.data);
                        let formData = result.data;
                        this.videoForm.patchValue({
                                name: formData.name,
                                address: formData.address,
                                gmail: formData.gmail,
                                phone: formData.phone,
                        });
                });
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
                if (this.videoForm.valid) {
                        this.servicio.update({
                                id: parseInt(this.id) as number,
                                name: this.nameControl ?.value as string,
                                address: this.addressControl ?.value as string,
                                phone: this.phoneControl ?.value as string,
                                gmail: this.gmailControl ?.value as string,
                        }, 'laboratory').subscribe({
                                next: (result: any) => {
                                        this.snakBarService.openSnackBar('Successfully edited', 'Close');
                                        this.returnToList();
                                  },
                                  error: (error: any) => {
                                        this.snakBarService.openSnackBar(
                                              'Error editing data.',
                                              'cerrar',
                                              {},
                                              'error'
                                        );
                                  },
                                complete: () => console.info('complete')
                        });
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
