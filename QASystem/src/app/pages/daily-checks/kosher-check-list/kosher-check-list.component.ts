import { Component, Input, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { KosherService } from '../../../services/daily-checks/kosher.service';

@Component({
  selector: 'app-kosher-check-list',
  templateUrl: './kosher-check-list.component.html',
  styleUrls: ['./kosher-check-list.component.scss']
})
export class KosherCheckListComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";
  notNumberField: string = "Only allowed numbers";

  @Input() period: string = '';
  nameQA!: string;
  foto!: string;

  radio!: string;

  options = [
    {
      value: false,
      name: 'Inaceptable',
      controlName: 'aceptable',
    },
    {
      value: true,
      name: 'Aceptable',
      controlName: 'aceptable',
    },
  ];

  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    date: new FormControl(null, {
      validators: [
      ],
      updateOn: 'change',
    }),
    comments: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(150),
      ],
      updateOn: 'change',
    }),
    rinsed_knife: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    human_handling: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    butt_push: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    cut_has: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    during_kosher: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    neck_area: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    }),
    /*    mark_on: new FormControl(null, {
         validators: [
           Validators.required
         ],
         updateOn: 'change',
       }),
       brisket_belly: new FormControl(null, {
         validators: [
           Validators.required
         ],
         updateOn: 'change',
       }),
       prior_to: new FormControl(null, {
         validators: [
           Validators.required
         ],
         updateOn: 'change',
       }),*/
    effectivenss: new FormControl(false, {
      validators: [
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: KosherService,
    private snakBarService: SnakBarService
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto
  }

  /* MAIN FORM FORM CONTROLS */
  get dateControl() {
    return this.mainForm.get('date');
  }
  get timeControl() {
    return this.mainForm.get('timke');
  }

  get commentsControl() {
    return this.mainForm.get('comments');
  }

  get rinsedControl() {
    return this.mainForm.get('rinsed_knife');
  }
  get humanControl() {
    return this.mainForm.get('human_handling');
  }

  get buttControl() {
    return this.mainForm.get('butt_push');
  }
  get cutControl() {
    return this.mainForm.get('cut_has');
  }
  get hosherControl() {
    return this.mainForm.get('during_kosher');
  }
  get neckControl() {
    return this.mainForm.get('neck_area');
  }
  /* get markControl() {
     return this.mainForm.get('mark_on');
   }
   get brisketControl() {
     return this.mainForm.get('brisket_belly');
   }
   get priorControl() {
     return this.mainForm.get('prior_to');
   }*/
  get effectControl() {
    return this.mainForm.get('effectivenss');
  }
  /* ******************* */

  /* MAIN FORM FORM SUBMIT */
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        monitor_user_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        date: this.dateControl ?.value as string,
        comments: this.commentsControl ?.value as string,
        informrinsed_nife_between_carcase_type: this.rinsedControl ?.value as boolean,
        human_handing_procedure: this.humanControl ?.value as boolean,
        butt_push_been_backed: this.buttControl ?.value as boolean,
        cut_has_been_sufficient: this.cutControl ?.value as boolean,
        during_kosher_brisket: this.hosherControl ?.value as boolean,
        neck_area_is_bane: this.neckControl ?.value as boolean,
        effectivenss_of_cut_kosher: this.effectControl ?.value as boolean
      }, 'quality-kosher')
        .subscribe(
          {
            next: (result: any) => {
              this.snakBarService.openSnackBar('Successfully created', 'Close');
              this.clearForm()
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

  radioChange(event: any) {
    this.radio = event.value;
  }
  /* ******************* */

}


