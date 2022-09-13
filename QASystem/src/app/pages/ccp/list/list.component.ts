import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { CcpGenericLogsComponent } from "../ccp-generic-logs/ccp-generic-logs.component";
//import { ConfigServiceService } from '../../../services/config-service.service';


@Component({
  selector: 'app-list-equipment',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  requiredField: string = "Campo requerido";

  period1 = 'period1';
  period2 = 'period2';
  period3 = 'period3';
  period4 = 'period4';
  period5 = 'period5';


  /**   '',//1
        'carcase_id',//1
        'correctuve_action_id',//1
        'preventive_action_id',//1
  ,//1 */

  fields1 = [
    {
      name: 'shift',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Shift:',

    },
    {
      name: 'first_carcase_id_number',
      class: 'col-6',
      type: 'number',
      model: '',
      label: 'First carcase id number'
    },
    {
      name: 'carcase_id',
      class: 'col-6',
      type: 'number',
      model: '',
      label: 'Carcase ID number or Lot:'
    },
    {
      name: 'defect_description',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Defect descriptions:'
    },
    {
      name: 'records_review_found_aceptabol',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Records review found acceptable:'
    },
    {
      name: 'pre_shipment_review',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Pre shipment review:'
    },
    {
      name: 'monitor_name',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Monitor name & Initials:'
    },
    {
      name: 'limit',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Limit'
    },
    /* {
       name: 'pre_shipment_name',
       class: 'col-6',
       type: 'input',
       model: '',
       label: 'Nombre pre envio:'
     },*/
    {
      name: 'visualizar_name',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Verifier name & Initials:'
    },
    {
      name: 'name_director',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Direct name:'
    },
    {
      name: 'director_general_evaluation',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Direct evaluation:'
    },
    {
      name: 'time_director_aprobation',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Direct approval time :'
    }
  ]
  fields2 = [
    {
      name: 'shift',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Shift:',

    },
    {
      name: 'first_carcase_id_number',
      class: 'col-6',
      type: 'number',
      model: '',
      label: 'First carcase id number'
    },
    {
      name: 'carcase_id',
      class: 'col-6',
      type: 'number',
      model: '',
      label: 'Carcase ID number or Lot:'
    },
    {
      name: 'defect_description',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Defect descriptions:'
    },
    {
      name: 'records_review_found_aceptabol',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Records review found acceptable:'
    },
    {
      name: 'pre_shipment_review',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Pre shipment review:'
    },
    {
      name: 'monitor_name',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Monitor name & Initials:'
    },
    {
      name: 'limit',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Limit'
    },
    /* {
       name: 'pre_shipment_name',
       class: 'col-6',
       type: 'input',
       model: '',
       label: 'Nombre pre envio:'
     },*/
    {
      name: 'visualizar_name',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Verifier name & Initials:'
    },
    {
      name: 'name_director',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Direct name:'
    },
    {
      name: 'director_general_evaluation',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Direct evaluation:'
    },
    {
      name: 'time_director_aprobation',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Direct approval time :'
    }
  ]
  fields3 = [
    {
      name: 'shift',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Shift:',

    },
    {
      name: 'first_carcase_id_number',
      class: 'col-6',
      type: 'number',
      model: '',
      label: 'First carcase id number'
    },
    {
      name: 'carcase_id',
      class: 'col-6',
      type: 'number',
      model: '',
      label: 'Carcase ID number or Lot:'
    },
    {
      name: 'defect_description',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Defect descriptions:'
    },
    {
      name: 'records_review_found_aceptabol',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Records review found acceptable:'
    },
    {
      name: 'pre_shipment_review',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Pre shipment review:'
    },
    {
      name: 'monitor_name',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Monitor name & Initials:'
    },
    {
      name: 'limit',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Limit'
    },
    {
      name: 'visualizar_name',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Verifier name & Initials:'
    },
    {
      name: 'name_director',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Direct name:'
    },
    {
      name: 'director_general_evaluation',
      class: 'col-6',
      type: 'text',
      model: '',
      label: 'Direct evaluation:'
    },
    {
      name: 'time_director_aprobation',
      class: 'col-6',
      type: 'input',
      model: '',
      label: 'Direct approval time :'
    }, {
      name: 'limit_low',
      class: 'col-4',
      type: 'input',
      label: 'Limit low',
      model: '',
    },
    {
      name: 'limit_mix',
      class: 'col-4',
      type: 'input',
      label: 'Limit mix',
      model: '',
    }, {
      name: 'limit_max',
      class: 'col-4',
      type: 'input',
      label: 'Limit max',
      model: '',
    }
  ];

  /* @ViewChild('ccp')
   ccp!: ElementRef;
   @ViewChild('gccp')
   gcpp!: CcpGenericLogsComponent;
   @ViewChild('gccp1')
   gcpp1!: CcpGenericLogsComponent;
   @ViewChild('gccp2')
   gcpp2!: CcpGenericLogsComponent;
 
   containerHegith!: number;
   originHegith!: number;*/

  constructor(
    //private service: ConfigServiceService,
    // private detector: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
  }
  /* emitComponentHeigth(data: number) {
     this.service.updateComponentHeigth(data);
   }
   ngAfterViewInit() {
     this.originHegith = this.gcpp.gccp.nativeElement.clientHeight;
     this.containerHegith = this.gcpp.gccp.nativeElement.clientHeight;
     this.emitComponentHeigth(this.ccp.nativeElement.clientHeight + 10);
   }*/

  /* onSelectTab(tab: number) {
     this.detector.detectChanges();
     console.warn("elemento", tab)
   } 
   ngAfterViewChecked() {
      let temp = 0;
      if (this.gcpp.gccp.nativeElement.clientHeight != 0) {
        temp = this.gcpp.gccp.nativeElement.clientHeight;
        console.warn("elemento hijo", temp);
      }
      if (this.gcpp1.gccp.nativeElement.clientHeight != 0) {
        temp = this.gcpp1.gccp.nativeElement.clientHeight;
        console.warn("elemento hijo 1", temp);
      }
      if (this.gcpp2.gccp.nativeElement.clientHeight != 0) {
        temp = this.gcpp2.gccp.nativeElement.clientHeight;
        console.warn("elemento hijo 2", temp);
      }
      /*  console.warn("elemento padre", this.ccp.nativeElement.clientHeight);
        console.warn("elemento hijo", this.containerHegith);
        console.warn("elemento hijo origin", this.originHegith);
   if(this.containerHegith != temp) {
   console.warn("elemento sdiferentes", this.containerHegith, temp);
   this.containerHegith = temp;
   console.warn("elemento coont y origin", this.containerHegith, this.originHegith);
   if (this.originHegith < this.containerHegith) {
     let aux = 0;
     aux = this.ccp.nativeElement.clientHeight + (this.containerHegith - this.originHegith);
     console.warn("Result to emit restaaa", (this.containerHegith - this.originHegith))
     console.warn("Result to emit", aux)
     this.emitComponentHeigth(aux);
   }
 } else {
   this.emitComponentHeigth(this.ccp.nativeElement.clientHeight + 10);
 }
   }*/
}

