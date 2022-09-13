import { Component, OnInit } from '@angular/core';
import {
        AbstractControl,
        FormControl,
        FormGroup,
        ValidatorFn,
        Validators,
} from '@angular/forms';

import { Location } from '@angular/common';
import { AreaService } from '../../../../../services/nomenclators/area.service'
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
                description: new FormControl(null, {
                        validators: [
                                Validators.required,
                        ],
                        updateOn: 'change',
                })
        });

        constructor(
                private location: Location,
                private servicio: AreaService,
                private route: ActivatedRoute,
                private snakBarService: SnakBarService,
        ) { }

        ngOnInit(): void {
                this.findById();
        }

        findById() {
                this.id = this.route.snapshot.paramMap.get('id');
                this.servicio.get(this.id, "department").subscribe((result: any) => {
                        let formData = result.data;
                        this.videoForm.patchValue({
                                name: formData.name,
                                description: formData.description,
                        });
                });
        }

        get nameControl() {
                return this.videoForm ?.get('name');
        }

        get descControl() {
                return this.videoForm.get('description');
        }

        returnToList(): void {
                this.location.back();
        }

        submitForm(): void {
                if (this.videoForm.valid) {
                        this.servicio.update({
                                id: parseInt(this.id) as number,
                                name: this.nameControl ?.value as string,
                                description: this.descControl ?.value as string
                                          }, 'department').subscribe({
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

        private ipValidator(): ValidatorFn {
                return (control: AbstractControl) => {
                        //const regex = /^([0-9] {1, 3}\.) {3}[0-9] {1, 3}$/; 

                        const regex = /^([0-9] {1, 3}\.) {3}[0-9] {1, 3}$/;
                        console.warn("estee es el test", regex.test(control.value))
                        if (regex.test(control.value)) {
                                return null;
                        } else {
                                return { ipError: true };
                        }
                };
        }
}
