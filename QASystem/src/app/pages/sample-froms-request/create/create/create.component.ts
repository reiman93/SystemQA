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
import { SnakBarService } from '../../../../components/snack-bar/snak-bar.service';

import { SampleRequestFormService } from '../../../../services/sample-request-from.service'

import { AreaService } from '../../../../services/nomenclators/area.service';
import { LaboratoryService } from '../../../../services/nomenclators/laboratory.service';
import { SampleFormsService } from '../../../../services/nomenclators/sample-forms.service';
import { AnalysisStateService } from '../../../../services/nomenclators/analysis-state.service';
import { AnalysisTypeService } from '../../../../services/nomenclators/analysis-type.service';

import { INomenclators } from 'src/app/interfaces/entity-interfaces';

declare var $: any;

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

      dataArea!: INomenclators[];
      dataLab!: INomenclators[];
      dataSample!: INomenclators[];
      dataState!: INomenclators[];
      dataAnalysis!: INomenclators[];

      videoForm = new FormGroup({
            name: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(50),
                  ],
                  updateOn: 'change',
            }),
            date: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(50),
                  ],
                  updateOn: 'change',
            }),
            area: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(150),
                  ],
                  updateOn: 'change',
            }),
            laboratory: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(150),
                  ],
                  updateOn: 'change',
            }),
            sample_forms: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(150),
                  ],
                  updateOn: 'change',
            }),
            analysis_types: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(150),
                  ],
                  updateOn: 'change',
            }),
            analisys_state: new FormControl(null, {
                  validators: [
                        Validators.required,
                        Validators.maxLength(150),
                  ],
                  updateOn: 'change',
            })
      });

      constructor(
            private location: Location,
            private servicio: SampleRequestFormService,
            private areaService: AreaService,
            private laboratoryService: LaboratoryService,
            private analysisService: AnalysisStateService,
            private typeService: AnalysisTypeService,
            private sampleService: SampleFormsService,
            private snakBarService: SnakBarService,
            private router: Router,
      ) { }

      ngOnInit(): void {
            this.getAllArea();
            this.getAllLab();
            this.getAllAnalysis();
            this.getAllSample();
            this.getAllType();
      }

      get nameControl() {
            return this.videoForm.get('name');
      }
      get dateControl() {
            return this.videoForm.get('date');
      }

      get areaControl() {
            return this.videoForm.get('area');
      }
      get labControl() {
            return this.videoForm.get('laboratory');
      }
      get analysisControl() {
            return this.videoForm.get('analysis_types');
      }
      get stateControl() {
            return this.videoForm.get('analisys_state');
      }
      get sampleControl() {
            return this.videoForm.get('sample_forms');
      }

      returnToList(): void {
            this.location.back();
      }

      goTo(target: string) {
            this.router.navigate(['pages/nomenclators/' + target + '/create']);
      }

      getAllLab() {
            this.laboratoryService.getAll('laboratory')
                  .subscribe({
                        next: (data: any) => {
                              this.dataLab = data.data;
                        },
                        error: (error: any) => {
                              this.snakBarService.openSnackBar(
                                    'Error getting data.',
                                    'close',
                                    {},
                                    'error'
                              )
                        },
                        complete: () => { }
                  }
                  );
      }
      getAllArea() {
            this.areaService.getAll('area')
                  .subscribe({
                        next: (data: any) => {
                              console.warn("fields sactions", data)
                              this.dataArea = data.data;
                              console.warn("this.dataAction", this.dataArea)
                        },
                        error: (error: any) => {
                              console.log('error', error);
                              this.snakBarService.openSnackBar(
                                    'Error getting data.',
                                    'close',
                                    {},
                                    'error'
                              )
                        },
                        complete: () => { }
                  }
                  );
      }
      getAllAnalysis() {
            this.analysisService.getAll('analisys_state')
                  .subscribe({
                        next: (data: any) => {
                              this.dataState = data.data;
                        },
                        error: (error: any) => {
                              this.snakBarService.openSnackBar(
                                    'Error getting data.',
                                    'close',
                                    {},
                                    'error'
                              )
                        },
                        complete: () => { }
                  }
                  );
      }
      getAllType() {
            this.typeService.getAll('analysis_type')
                  .subscribe({
                        next: (data: any) => {
                              this.dataAnalysis = data.data;
                        },
                        error: (error: any) => {
                              this.snakBarService.openSnackBar(
                                    'Error getting data.',
                                    'close',
                                    {},
                                    'error'
                              )
                        },
                        complete: () => { }
                  }
                  );
      }
      getAllSample() {
            this.sampleService.getAll('sample-froms')
                  .subscribe({
                        next: (data: any) => {
                              this.dataSample = data.data;
                        },
                        error: (error: any) => {
                              this.snakBarService.openSnackBar(
                                    'Error getting data.',
                                    'close',
                                    {},
                                    'error'
                              )
                        },
                        complete: () => { }
                  }
                  );
      }

      submitForm(): void {
            if (this.videoForm.valid) {
                  this.servicio.create(
                        this.videoForm.value,
                        JSON.parse(sessionStorage.getItem('currentUser')!).username,
                        'sample-request-forms'
                  )
                        .subscribe(
                              {
                                    next: (result: any) => {
                                          this.snakBarService.openSnackBar('Successfully created', 'Close');
                                          this.returnToList();
                                    },
                                    error: (error: any) => {
                                          this.snakBarService.openSnackBar(
                                                'Error getting data.',
                                                'close',
                                                {},
                                                'error'
                                          );
                                    },
                                    complete: () => { }
                              }
                        );
            }
      }
}
