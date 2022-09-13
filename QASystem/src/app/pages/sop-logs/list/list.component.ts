import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
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

  period1 = 1;
  period2 = 2;
  period3 = 3;
  period4 = 4;
  period5 = 5;

  type1 = [{
    name: 'Product handling',
    value: 'Product handling'
  }, {
    name: 'Employee dress',
    value: 'Employee dress'
  }, {
    name: 'Condensation',
    value: 'Condensation'
  }];
  type2 = [{
    name: 'Hide opening',
    value: 'Hide opening'
  }, {
    name: 'Evisceration',
    value: 'Evisceration'
  }, {
    name: 'Buckets and Tubs',
    value: 'Buckets and Tubs'
  }];
  type3 = [{
    name: 'Sterilizar temperatura',
    value: 'Sterilizar temperatura'
  }, {
    name: 'Packanging material',
    value: 'Packanging material'
  }, {
    name: 'Pest and rodent',
    value: 'Pest and rodent'
  }];
  type4 = [{
    name: 'Equipment Surfaces Prior',
    value: 'Equipment Surfaces Prior'
  }, {
    name: 'Esposed Variety Meauts at Breaks',
    value: 'Esposed Variety Meauts at Breaks'
  }, {
    name: 'Lunch Break Sanitation',
    value: 'Lunch Break Sanitation'
  }];
  type5 = [{
    name: 'Specific Risk Material Handling Equipment',
    value: 'Specific Risk Material Handling Equipment'
  }, {
    name: 'Specific Risk Material Hundling',
    value: 'Specific Risk Material Hundling'
  }, {
    name: 'Boot Foamer Evosceration',
    value: 'Boot Foamer Evosceration'
  }];

  @ViewChild('myIdentifier')
  myIdentifier!: ElementRef;


  constructor(
    // private service: ConfigServiceService,
  ) { }

  ngOnInit(): void {
    this.li = [{
      index: 0,
      href: "#sop-log-1",
      label: "sop log #1"
    },
    {
      index: 1,
      href: "#sop-log-2",
      label: "sop log #2"
    },
    {
      index: 2,
      href: "#sop-log-3",
      label: "sop log #3"
    },
    {
      index: 3,
      href: "#sop-log-4",
      label: "sop log #4"
    },
    ];
    this.nextTabs = [
      {
        index: 5,
        href: "#sop-log-5",
        label: "sop log #5"
      },
      {
        index: 6,
        href: "#sop-log-6",
        label: "Sop log sheet suplemental"
      }
    ];
    this.prevTabs = [];
    this.clickActive(0);
  }

  /* emitComponentHeigth(data: number) {
     this.service.updateComponentHeigth(data);
   }
   ngAfterViewInit() {
     this.emitComponentHeigth(this.myIdentifier.nativeElement.clientHeight);
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
