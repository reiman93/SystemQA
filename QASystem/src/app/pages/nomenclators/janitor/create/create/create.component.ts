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
import { Router } from '@angular/router';

import { JanitorService } from '../../../../../services/nomenclators/janitor.service'

import { TurnTypeService } from '../../../../../services/nomenclators/turn-type.service';
import { CompanyService } from '../../../../../services/nomenclators/company.service';

import { SnakBarService } from '../../../../../components/snack-bar/snak-bar.service';

@Component({
      selector: 'app-create',
      templateUrl: './create.component.html',
      styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


      requiredField: string = "Required field.";
      maxField: string = "Max characters allowed.";
      onlyNumbres: string = "Only allowed numbers";

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
      companyData: any;
      turnsData: any;

      constructor(
            private location: Location,
            private servicio: JanitorService,
            private turnService: TurnTypeService,
            private caompanyService: CompanyService,
            private snakBarService: SnakBarService,
            private router: Router,
      ) { }

      ngOnInit(): void {
            this.getAllCompany();
            this.getAllTurn();
      }
      goTo(target: string) {
            this.router.navigate(['pages/nomenclators/' + target + '/create']);
      }
      getAllTurn() {
            this.turnService.getAll('turn_type')
                  .subscribe({
                        next: (data: any) => {
                              console.warn("aaaha", data)
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
                              console.warn("aaaha", data)
                              this.companyData = data.data;
                        },
                        error: (error: any) => {
                              console.log('error', error);
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

      get nameControl() {
            return this.videoForm.get('name');
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

      submitForm(): void {
            if (this.videoForm.valid) {
                  this.servicio.create(this.videoForm.value, 'janitor')
                        .subscribe({
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
