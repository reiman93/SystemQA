import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
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

//import { ConfigServiceService } from '../../../services/config-service.service';


@Component({
  selector: 'app-list-equipment',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  requiredField: string = "Campo requerido";

  active: boolean[] = [];
  items = 6;
  li!: any;
  prevTabs!: any;
  nextTabs!: any;

  @ViewChild('nozle')
  nozle!: ElementRef;

  period1 = 'period1';
  period2 = 'period2';
  period3 = 'period3';
  period4 = 'period4';
  period5 = 'period5';

  /* conf = {
     date: true,
     time: true
   };
   conf1 = {
     date: true,
     time: false
   }*/
  fields1 = [
    {
      name: 'action',
      class: 'col-6',
      type: 'input',
      label: 'Accion:'
    },
    {
      name: 'period',
      class: 'col-6',
      type: 'number',
      label: 'Periodo:'
    },
    {
      name: 'clorine',
      class: 'col-6',
      type: 'text',
      label: 'Cloro:'
    },
    {
      name: 'sanitary_conditions',
      class: 'col-6',
      type: 'text',
      label: 'Condiciones sanitarias:'
    },
    {
      name: 'nozzles_propiety',
      class: 'col-6',
      type: 'text',
      label: 'Prioridades de trabajo de la boquilla:'
    },
    {
      name: 'flugged_nozzels',
      class: 'col-6',
      type: 'check',
      label: 'Boquilla maltratada:'
    },
    {
      name: 'barrel_checked',
      class: 'col-6',
      type: 'check',
      label: 'Brarril chequedo:'
    },
    {
      name: 'clorine_added',
      class: 'col-6',
      type: 'check',
      label: 'Cloro adicionado:'
    },
    {
      name: 'comments',
      class: 'col-6',
      type: 'input',
      label: 'Comentarios:'
    }
  ]

  /* 'date',
   'verification_type',
   'random_time',
   'random_num',
   'randomcode'*/
  randomAudit = [
    {
      name: 'random_num',
      class: 'col-12',
      type: 'number',
      label: 'Periodo:'
    },
    {
      name: 'randomcode',
      class: 'col-12',
      type: 'input',
      label: 'Codigo random:'
    },
    {
      name: 'verification_type',
      class: 'col-12',
      type: 'input',
      label: 'Tipo verificacion:'
    }
  ]

  fields2 = [
    {
      name: 'process',
      class: 'col-6',
      type: 'input',
      label: 'Proceso:',

    },
    {
      name: 'period',
      class: 'col-6',
      type: 'number',
      label: 'Periodo:'
    },
    {
      name: 'lactic_mp3',
      class: 'col-6',
      type: 'check',
      label: 'Lactico MP3:'
    },
    {
      name: 'nozzals_working',
      class: 'col-6',
      type: 'check',
      label: 'Boquillas trabajando:'
    },
    {
      name: 'plugged_nozzles',
      class: 'col-6',
      type: 'check',
      label: 'Boquillas conectadas:'
    },
    {
      name: 'propper_alications',
      class: 'col-6',
      type: 'check',
      label: 'Boquillas conectadas:'
    },
    {
      name: 'product_sprend_out',
      class: 'col-6',
      type: 'check',
      label: 'Productos agotados:'
    }
  ]

  fields3 = [
    {
      name: 'shift',
      class: 'col-6',
      type: 'input',
      label: 'Cambio:',

    },
    {
      name: 'carcase_number',
      class: 'col-6',
      type: 'input',
      label: 'Numero de Carcasa:'
    },
    {
      name: 'defect_description',
      class: 'col-6',
      type: 'text',
      label: 'Descripcion defectos:'
    },
    {
      name: 'initial_time',
      class: 'col-6',
      type: 'input',
      label: 'Tiempo inicial:'
    },
    {
      name: 'records_review',
      class: 'col-6',
      type: 'text',
      label: 'Datos revisados:'
    },
    {
      name: 'pre_shipment_review',
      class: 'col-6',
      type: 'text',
      label: 'Revision pre-envio :'
    },
    {
      name: 'monitor_name',
      class: 'col-6',
      type: 'input',
      label: 'Nombre monitor:'
    },
    {
      name: 'pre_shipment_name',
      class: 'col-6',
      type: 'input',
      label: 'Nombre pre envio:'
    },
    {
      name: 'name_director',
      class: 'col-6',
      type: 'input',
      label: 'Nombre director:'
    },
    {
      name: 'director_evaluation',
      class: 'col-6',
      type: 'text',
      label: 'Evaluacion del director:'
    },
    {
      name: 'time_aprobation',
      class: 'col-6',
      type: 'input',
      label: 'Tiempo de aprobacion del director:'
    }, {
      name: 'limit_low',
      class: 'col-4',
      type: 'input',
      label: 'Limite minimo'
    },
    {
      name: 'limit_mix',
      class: 'col-4',
      type: 'input',
      label: 'Limite mixto'
    }, {
      name: 'limit_max',
      class: 'col-4',
      type: 'input',
      label: 'Limite maximo'
    }
  ]


  constructor(
    //private service: ConfigServiceService,
  ) { }

  ngOnInit(): void {
    //
    this.li = [{
      index: 0,
      href: "#nozle-log-1",
      label: "Reserve our rail carcass"
    }, {
      index: 1,
      href: "#wr-random-audit",
      label: "Western reserve random audit"
    },
    {
      index: 2,
      href: "#nozle-log-2",
      label: "Nozzle Inspection From"
    }
    ];
    this.nextTabs = [
      {
        index: 3,
        href: "#nozle-log-3",
        label: "Chlorine Nozzle Inspection"
      },
      {
        index: 5,
        href: "#app-hold-tag",
        label: "Hold Tag Log"
      },
      {
        index: 4,
        href: "#app-animal-handing",
        label: "Animal handing"
      }
    ];
    this.prevTabs = [];
    this.clickActive(0);
  }
  /* emitComponentHeigth(data: number) {
     this.service.updateComponentHeigth(data);
   }
   ngAfterViewInit() {
     this.emitComponentHeigth(this.nozle.nativeElement.clientHeight + 10);
   }*/
  clickActive = (parm: number) => {
    for (let i = 0; i < this.active.length; i++) {
      this.active[i] = false;
    }
    this.active[parm] = true;
  }

  prevTab = () => {
    this.nextTabs.push(this.li.pop());
    this.li.unshift(this.prevTabs.pop());
  }
  nexTab = () => {
    this.prevTabs.push(this.li.shift());
    this.li.push(this.nextTabs.shift());
  }
}
