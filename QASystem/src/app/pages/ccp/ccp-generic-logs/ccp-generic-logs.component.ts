import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { IForm } from 'src/app/interfaces/IObject';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { SopLogsService } from '../../../services/sop-logs.service';
import { ActionsService } from '../../../services/nomenclators/actions.service';
import { PreventiveActionsService } from 'src/app/services/nomenclators/preventive-actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ccp-generic-logs',
  templateUrl: './ccp-generic-logs.component.html',
  styleUrls: ['./ccp-generic-logs.component.scss']
})
export class CcpGenericLogsComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";
  notNumberField: string = "Only allowed numbers";

  @Input() period: string = '';
  @Input() fields!: IForm[];
  @Input() service!: any;
  nameQA!: string;
  foto!: string;
  dataSend: any;
  dataAction: any;
  dataPreventive: any;

  @ViewChild('gccp')
  gccp!: ElementRef;

  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    time: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    date: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    preventive_action: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    corrective_action: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: SopLogsService,
    private snakBarService: SnakBarService,
    private servicioAction: ActionsService,
    private servicioPreventive: PreventiveActionsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name;
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto;
    this.getAllAction();
    this.getAllPreventive();
    this.addInputControl();
  }


  /* MAIN FORM FORM CONTROLS */
  get timeControl() {
    return this.mainForm.get('time');
  }
  get dateControl() {
    return this.mainForm.get('date');
  }

  get correctiveControl() {
    return this.mainForm.get('corrective_action');
  }
  get preventiveControl() {
    return this.mainForm.get('preventive_action');
  }

  get propertyDiv(): ElementRef {
    return this.gccp;
  }
  /* ******************* */
  getAllAction() {
    this.servicioAction.getAll('relapse_action')
      .subscribe({
        next: (data: any) => {
          this.dataAction = data.data;
        },
        error: (error: any) => {
          this.snakBarService.openSnackBar(
            'Error getting data.',
            'Close',
            {},
            'error'
          );
        },
        complete: () => { }
      }
      );
  }

  getAllPreventive() {
    this.servicioPreventive.getAll('preventive_action')
      .subscribe({
        next: (data: any) => {
          this.dataPreventive = data.data;
        },
        error: (error: any) => {
          this.snakBarService.openSnackBar(
            'Error getting data.',
            'Close',
            {},
            'error'
          );
        },
        complete: () => { }
      }
      );
  }
  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.fillData();

      this.servicio.create(
        this.dataSend, this.service)
        .subscribe(
          {
            next: (result: any) => {
              this.snakBarService.openSnackBar('Successfully created', 'Close');
            },
            error: (error: any) => {
              this.snakBarService.openSnackBar(
                'Error creating data.',
                'Close',
                {},
                'error'
              );
            },
            complete: () => { }
          }
        );
    }
  }
  /* ******************* */

  /* MAIN FORM FORM RESET */
  clearForm() {
    this.mainForm.reset();
  }
  /* ******************* */

  /* MAIN FORM FORM DYNAMIC FIELDS */
  addInputControl() {
    let abstControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(10),
      ],
      updateOn: 'change',
    })
    let abstControl2 = new FormControl(null, {
      validators: [
        Validators.required,
        this.isNumberValidation()
      ],
      updateOn: 'change',
    })
    this.fields.forEach((val: any, index) => {
      if (val.type == "number") {
        this.mainForm.addControl(val.name, abstControl2);
      } else {
        this.mainForm.addControl(val.name, abstControl);
      }
      this.dataSend = {
        [val.name]: null
      }
    });

  }
  fillData() {
    this.fields.forEach((value, index) => {
      this.dataSend[value.name] = value.model;
    });
    this.dataSend['monitor_name'] = JSON.parse(sessionStorage.getItem('currentUser')!).username;
    this.dataSend['date'] = this.dateControl ?.value as string;
    this.dataSend['initial_time'] = this.timeControl ?.value as string;
    this.dataSend['correctuve_action_id'] = this.correctiveControl ?.value as number;
    this.dataSend['preventive_action_id'] = this.preventiveControl ?.value as number;
  }

  goTo(target: string) {
    this.router.navigate(['pages/nomenclators/' + target + '/create']);
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
  /* ******************* */

}

