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
import { SampleRequestFormService } from '../../../../services/sample-request-from.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnakBarService } from '../../../../components/snack-bar/snak-bar.service';

import { INomenclators } from 'src/app/interfaces/entity-interfaces';

import { AreaService } from '../../../../services/nomenclators/area.service';
import { LaboratoryService } from '../../../../services/nomenclators/laboratory.service';
import { SampleFormsService } from '../../../../services/nomenclators/sample-forms.service';
import { AnalysisStateService } from '../../../../services/nomenclators/analysis-state.service';
import { AnalysisTypeService } from '../../../../services/nomenclators/analysis-type.service';

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
                private route: ActivatedRoute,
                private snakBarService: SnakBarService,
        ) { }

        ngOnInit(): void {
                this.findById();

                this.getAllArea();
                this.getAllLab();
                this.getAllAnalysis();
                this.getAllSample();
                this.getAllType();
        }

        findById() {
                this.id = this.route.snapshot.paramMap.get('id');
                this.servicio.get(this.id, 'sample-request-forms').subscribe((result: any) => {
                        let formData = result.data[0];
                        this.videoForm.patchValue({
                                name: formData.name,
                                date: formData.date,
                        });
                });
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
                                        this.dataArea = data.data;
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
                        this.servicio.update({
                                id: parseInt(this.id) as number,
                                name: this.nameControl ?.value as string,
                                date: this.dateControl ?.value as string,
                                state_analisys_id: this.stateControl ?.value as number,
                                analysis_types_id: this.analysisControl ?.value as number,
                                areas_id: this.areaControl ?.value as number,
                                sample_forms_id: this.sampleControl ?.value as number,
                                laboratories_id: this.labControl ?.value as number,
                                users_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
                        }, 'sample-request-forms').subscribe({
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
                                complete: () => { }
                        });
                }
        }
}
