import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nomenclators',
  templateUrl: './nomenclators.component.html',
  styleUrls: ['./nomenclators.component.scss']
})
export class NomenclatorsComponent implements OnInit {
  active: boolean[] = [];
  items = 13;
  li!: any;
  prevTabs!: any;
  nextTabs!: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.li = [{
      router: ['area'],
      index: 0,
      label: "Area"
    }, {
      router: ['department'],
      index: 1,
      label: "Department"
    },
    {
      router: ['deficiency'],
      index: 2,
      label: "Deficiency"
    },
    {
      router: ['turn'],
      index: 3,
      label: "Turn"
    }
    ];
    this.nextTabs = [
      {
        router: ['company'],
        index: 4,
        label: "Cleaning company"
      },
      {
        router: ['janitor'],
        index: 5,
        label: "Janitor"
      },
      {
        router: ['actions'],
        index: 6,
        label: "Corrective actions"
      },
      {
        router: ['preventive-actions'],
        index: 7,
        label: "Preventive actions"
      },
      {
        router: ['laboratory'],
        index: 8,
        label: "Laboratory"
      },
      {
        router: ['analysis-state'],
        index: 9,
        label: "Analysis state"
      },
      {
        router: ['analysis-type'],
        index: 10,
        label: "Analysis type"
      },
      {
        router: ['sample-forms'],
        index: 11,
        label: "Sample forms"
      },
      {
        router: ['sample-request-type'],
        index: 12,
        label: "Sample request type"
      }
    ];
    this.prevTabs = [];
    /* for (let i = 0; i < this.items; i++) {
       this.active.push(false);
     }*/
    //  this.clickActive(0);
    //  this.router.navigate(['pages/nomenclators/area']);
  }

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
