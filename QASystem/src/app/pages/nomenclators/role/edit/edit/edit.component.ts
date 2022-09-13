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
import { AnalysisTypeService } from '../../../../../services/nomenclators/analysis-state.service'
import { ActivatedRoute, Router } from '@angular/router';
import { SnakBarService } from '../../../../../components/snack-bar/snak-bar.service';

@Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html',
        styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

        requiredField: string = "Campo requerido";

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
                private servicio: AnalysisTypeService,
                private route: ActivatedRoute,
                private snakBarService: SnakBarService,
        ) { }

        ngOnInit(): void {
                this.findById();
        }

        findById() {
                this.id = this.route.snapshot.paramMap.get('id');
                this.servicio.get(this.id, "analysis-type").subscribe((result: any) => {
                        let formData = result.data[0];
                        this.videoForm.patchValue({
                                name: formData.name,
                                description: formData.description,
                        });
                });
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
                        this.servicio.update({
                                id: parseInt(this.id) as number,
                                name: this.nameControl ?.value as string,
                                description: this.descControl ?.value as string,
                        }, 'analysis-type').subscribe({
                                next: (result: any) => {
                                        this.snakBarService.openSnackBar('Editado correctamente', 'Cerrar');
                                        this.returnToList();
                                },
                                error: (error: any) => {
                                        this.snakBarService.openSnackBar(
                                                'Error al editar los datos.',
                                                'cerrar',
                                                {},
                                                'error'
                                        );
                                },
                                complete: () => console.info('complete')
                        });
                }
        }
}
