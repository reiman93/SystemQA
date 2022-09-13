import { Component, OnInit } from '@angular/core';
import {
        AbstractControl,
        FormControl,
        FormGroup,
        ValidatorFn,
        Validators,
} from '@angular/forms';

import { Location } from '@angular/common';
import { JanitorService } from '../../../../../services/nomenclators/janitor.service'

import { TurnTypeService } from '../../../../../services/nomenclators/turn-type.service';
import { CompanyService } from '../../../../../services/nomenclators/company.service';
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
        onlyNumbres: string = "Only allowed numbers";

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
                lastname: new FormControl(null, {
                        validators: [
                                Validators.required,
                        ],
                        updateOn: 'change',
                }),
                phone: new FormControl(null, {
                        validators: [
                                Validators.required,
                                this.isNumberValidation,
                        ],
                        updateOn: 'change',
                }),
                turn: new FormControl(null, {
                        validators: [
                                Validators.required,
                                Validators.maxLength(150),
                        ],
                        updateOn: 'change',
                }),
                company: new FormControl(null, {
                        validators: [
                                Validators.required,
                                Validators.maxLength(150),
                        ],
                        updateOn: 'change',
                })
        });
        turnsData: any;
        companyData: any;

        constructor(
                private location: Location,
                private servicio: JanitorService,
                private turnService: TurnTypeService,
                private caompanyService: CompanyService,
                private route: ActivatedRoute,
                private snakBarService: SnakBarService,
                private router: Router,
        ) { }

        ngOnInit(): void {
                this.findById();
                this.getAllCompany();
                this.getAllTurn();
        }

        getAllTurn() {
                this.turnService.getAll('turn_type')
                        .subscribe({
                                next: (data: any) => {
                                           this.turnsData = data.data;
                                },
                                error: (error: any) => {
                                        console.log('error', error);
                                        this.snakBarService.openSnackBar(
                                                'Error al obtener los datos de turno.',
                                                'cerrar',
                                                {},
                                                'error'
                                        )
                                },
                                complete: () => console.info('complete')
                        }
                        );
        }
        getAllCompany() {
                this.caompanyService.getAll('company')
                        .subscribe({
                                next: (data: any) => {
                                        this.companyData = data.data;
                                },
                                error: (error: any) => {
                                        this.snakBarService.openSnackBar(
                                                'Error al obtener los datos de company.',
                                                'cerrar',
                                                {},
                                                'error'
                                        )
                                },
                                complete: () => console.info('complete')
                        }
                        );
        }
        findById() {
                this.id = this.route.snapshot.paramMap.get('id');
                this.servicio.get(this.id, "janitor").subscribe((result: any) => {
                        let formData = result.data;
                        this.turnControl!.setValue(formData.turn_types_id);
                        this.companyControl!.setValue(formData.cleaning_companies_id);
                        this.videoForm.patchValue({
                                name: formData.name,
                                lastname: formData.lastname,
                                phone: formData.phone
                        });
                });
        }

        get nameControl() {
                return this.videoForm ?.get('name');
        }


        get lastnameControl() {
                return this.videoForm.get('lastname');
        }
        get phoneControl() {
                return this.videoForm.get('phone');
        }
        get turnControl() {
                return this.videoForm.get('turn');
        }
        get companyControl() {
                return this.videoForm.get('company');
        }

        returnToList(): void {
                this.location.back();
        }
        goTo(target: string) {
                this.router.navigate(['pages/nomenclators/' + target + '/create']);
          }

        submitForm(): void {
                if (this.videoForm.valid) {
                        this.servicio.update({
                                id: parseInt(this.id) as number,
                                name: this.nameControl ?.value as string,
                                lastname: this.lastnameControl ?.value as string,
                                phone: this.lastnameControl ?.value as string,
                                company: parseInt(this.companyControl ?.value),
                                turn: parseInt(this.turnControl ?.value)
                        }, 'janitor').subscribe({
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
