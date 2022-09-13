import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoguinServiceService } from 'src/app/services/auth/loguin-service.service';
import {ConfigServiceService} from '../../../services/config-service.service'
import { SnakBarService } from 'src/app/components/snack-bar/snak-bar.service';
/* import { saveAs } from 'file-saver'; */
/* import { writeFileSync } from "fs";
import { resolve } from "path"; */
/* const fs = require('fs');
const path = require('path'); */
/* import * as fs from 'fs';
import * as path from 'path'; */



@Component({
      selector: 'app-loguin',
      templateUrl: './loguin.component.html',
      styleUrls: ['./loguin.component.scss']
})
export class LoguinComponent implements OnInit {

      requiredField: string = "Campo requerido";

      user !: string;
      pass !: string;

      myForm = new FormGroup({
            user: new FormControl('', {
                  validators: [Validators.required],
                  updateOn: 'change',
            }),
            pass: new FormControl('', {
                  validators: [
                        Validators.required,
                  ],
                  updateOn: 'change',
            }),
            /*        ip: new FormControl('', {
                         //validators: [Validators.required, Validators.pattern("(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)")],
                         updateOn: 'change',
                   }),
                   port: new FormControl('', {
                         // validators: [Validators.required, Validators.maxLength(4), this.isNumberValidation()],
                         updateOn: 'change',
                   }), */
      });

      constructor(
            public fb: FormBuilder,
            private servicio: LoguinServiceService,
            private router: Router,
            private enviroment:ConfigServiceService,
            private snakBarService: SnakBarService,
      ) { }

      ngOnInit(): void {
            this.enviroment.loadAppConfig();
      }

      get userControl() {
            return this.myForm.get('user');
      }
      get passControl() {
            return this.myForm.get('pass');
      }
      /*      get ipControl() {
                 return this.myForm.get('ip');
           }
           get portControl() {
                 return this.myForm.get('port');
           } */

      returnToList() {
            this.router.navigateByUrl('pages');
      }

      submitForm(): void {
            /*    let __dirname = "../../../assets/json/config.json"
               let config = {
                     "server": {
                           "ip": this.ipControl!.value,
                           "port": this.portControl!.value,
                           "protocol": "http"
                     },
                     "endpoint": {
                           "services": "/services/",
                           "acceso": "/api_accessmanager/"
                     }
               } */
            /*    writeFileSync(resolve(__dirname), JSON.stringify(config)); */
            /*   const blob = new Blob([JSON.stringify(config)], { type: 'application/json' });
              saveAs(blob, __dirname); */
            //  this.saveText(JSON.stringify(config), 'config.json', __dirname);
            if (this.myForm.valid) {
                  this.servicio.authenticateUser(this.myForm.value, 'authenticate')
                        .subscribe( {
                              next: (result: any) => {
                                this.returnToList();
                              },
                              error: (error: any) => {
                                this.snakBarService.openSnackBar(
                                  'Authentication error',
                                  'cerrar',
                                  {},
                                  'error'
                                );
                              },
                              complete: () => {}
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

      saveText(text: any, filename: any, url: any) {  //function to save fale important!!!
            var a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
            a.setAttribute('download', filename);
            a.click()
      }

      /*"browser": {
            "fs": false,
            "path": false,
            "os": false
      }*/
}
