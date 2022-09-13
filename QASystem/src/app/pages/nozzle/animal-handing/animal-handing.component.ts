import { Component, Input, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { AnimalHandingService } from '../../../services/nozle/animal-handing.service';
import { ActionsService } from '../../../services/nomenclators/actions.service';


@Component({
  selector: 'app-animal-handing',
  templateUrl: './animal-handing.component.html',
  styleUrls: ['./animal-handing.component.scss']
})
export class AnimalHandingComponent implements OnInit {

  requiredField: string = "Required field.";
  maxField: string = "Max characters allowed.";
  notNumber: string = "Numbers only allowed.";

  nameQA!: string;
  foto!: string;
  dataAction: any;
  /* MAIN FORM FORM */
  mainForm = new FormGroup({
    plant_number: new FormControl(null, {
      validators: [
        this.isNumberValidation(),
        Validators.required,
        Validators.maxLength(5),
      ],
      updateOn: 'change',
    }),
    state_animal: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.maxLength(10),
      ],
      updateOn: 'change',
    }),
    count: new FormControl(null, {
      validators: [
        this.isNumberValidation(),
        Validators.required,
        Validators.maxLength(5),
      ],
      updateOn: 'change',
    }),
    name: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    shift: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),

    prod: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    in_plant: new FormControl(null, {
      validators: [
        this.isNumberValidation(),
        Validators.required,
        Validators.maxLength(5),
      ],
      updateOn: 'change',
    }),
    acts: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    acces: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    holding: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    les_75: new FormControl(null, {
      validators: [
        this.isNumberValidation(),
        Validators.required,
        Validators.maxLength(5),
      ],
      updateOn: 'change',
    }),
    employed_stunning: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    employed_prodding: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    triller: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    tuck: new FormControl(null, {
      validators: [
        this.isNumberValidation(),
        Validators.required,
        Validators.maxLength(5),
      ],
      updateOn: 'change',
    }),
    time_arrival: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    time_unloading: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    comments: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    corrective: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    unloading: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    willfull: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    sleep: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    }),
    vocalization: new FormControl(null, {
      validators: [
        this.isNumberValidation(),
        Validators.required,
        Validators.maxLength(5),
      ],
      updateOn: 'change',
    }),
    vocalization3: new FormControl(null, {
      validators: [
        this.isNumberValidation(),
        Validators.required,
        Validators.maxLength(5),
      ],
      updateOn: 'change',
    }),
    vocalization5: new FormControl(null, {
      validators: [
        this.isNumberValidation(),
        Validators.required,
        Validators.maxLength(5),
      ],
      updateOn: 'change',
    }),
    rotating: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    })
  });
  /* ******************* */
  constructor(
    private servicio: AnimalHandingService,
    private snakBarService: SnakBarService,
    private servicioAction: ActionsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.nameQA = JSON.parse(sessionStorage.getItem('currentUser')!).name;
    this.foto = JSON.parse(sessionStorage.getItem('currentUser')!).foto;
    this.getAllAction();
  }

  /* MAIN FORM FORM CONTROLS */

  get plantNumberControl() {
    return this.mainForm.get('plant_number');
  }
  get stateControl() {
    return this.mainForm.get('state_animal');
  }
  get countControl() {
    return this.mainForm.get('count');
  }
  get nameControl() {
    return this.mainForm.get('name');
  }
  get shiftControl() {
    return this.mainForm.get('shift');
  }
  get prodControl() {
    return this.mainForm.get('prod');
  }
  get in_plantControl() {
    return this.mainForm.get('in_plant');
  }

  get actsControl() {
    return this.mainForm.get('acts');
  }

  get accesControl() {
    return this.mainForm.get('acces');
  }
  get holdingControl() {
    return this.mainForm.get('holding');
  }
  get les_75Control() {
    return this.mainForm.get('les_75');
  }
  get employedStunningControl() {
    return this.mainForm.get('employed_stunning');
  }
  get employedProddingControl() {
    return this.mainForm.get('employed_prodding');
  }
  get trillerControl() {
    return this.mainForm.get('triller');
  }
  get tuckControl() {
    return this.mainForm.get('tuck');
  }
  get timeArrivalControl() {
    return this.mainForm.get('time_arrival');
  }
  get timeUnloadingControl() {
    return this.mainForm.get('time_unloading');
  }
  get commentsControl() {
    return this.mainForm.get('comments');
  }

  get correctiveControl() {
    return this.mainForm.get('corrective');
  }
  get unloadingControl() {
    return this.mainForm.get('unloading');
  }
  get willfullControl() {
    return this.mainForm.get('willfull');
  }
  get sleepControl() {
    return this.mainForm.get('sleep');
  }
  get vocalizationControl() {
    return this.mainForm.get('vocalization');
  }

  get vocalization3Control() {
    return this.mainForm.get('vocalization3');
  }
  get vocalization5Control() {
    return this.mainForm.get('vocalization5');
  }
  get rotatingControl() {
    return this.mainForm.get('rotating');
  }
  /* ******************* */

  goTo(target: string) {
    this.router.navigate(['pages/nomenclators/' + target + '/create']);
  }
  /* MAIN FORM FORM SUBMIT */
  getAllAction() {
    this.servicioAction.getAll('relapse_action')
      .subscribe({
        next: (data: any) => {
          this.dataAction = data.data;
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
  submitForm(): void {
    if (this.mainForm.valid) {
      this.servicio.create({
        users_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        plant_number: this.plantNumberControl?.value as string,
        state_animal: this.plantNumberControl?.value as string,
        haad_count: this.countControl?.value as string,
        name: this.nameControl?.value as string,
        shift: this.shiftControl?.value as string,
        prod_usage: this.prodControl?.value as string,
        in_plant: this.in_plantControl?.value as string,
        vocalization5: this.vocalization5Control?.value as string,
        vocalization3: this.vocalization3Control?.value as string,
        acts_abuse_observe: this.actsControl?.value as string,
        acces_to_clean_drinking_wather: this.accesControl?.value as string,
        holding_pens_overcrowded: this.holdingControl?.value as string,
        kept_les_75: this.les_75Control?.value as string,
        name_employed_stunning: this.employedStunningControl?.value as string,
        name_employed_prodding: this.employedProddingControl?.value as string,
        triller_condition: this.trillerControl?.value as string,
        tuck_name_number: this.tuckControl?.value as string,
        time_arrival: this.timeArrivalControl?.value as string,
        time_unloading: this.timeUnloadingControl?.value as string,
        comments: this.commentsControl?.value as string,
        //  corrective_actions_id: this.correctiveControl?.value as string,
        unloading_dock: this.unloadingControl?.value as string,
        willfull_acts_ofabuse: this.willfullControl?.value as string,
        sleep_fals: this.sleepControl?.value as string,
        vocalization: this.vocalizationControl?.value as string,
        rotating_knocking_box: this.rotatingControl?.value as string,
      }, 'animal-handing')
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

