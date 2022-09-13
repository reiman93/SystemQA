import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';



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


  period1 = 'period1';
  period2 = 'period2';
  period3 = 'period3';

  @ViewChild('myIdentifier')
  myIdentifier!: ElementRef;

  constructor(
    // private service: ConfigServiceService,
  ) { }

  /*emitComponentHeigth(data: number) {
    this.service.updateComponentHeigth(data);
  }*/

  ngOnInit(): void {
    //
    this.li = [{
      index: 0,
      href: "#wr-kill-floor",
      label: "Kill floor sterilize"
    },
    {
      index: 1,
      href: "#wr-out-rail",
      label: "Western reserve out rail carcass"
    },
    {
      index: 2,
      href: "#slaughter-floor",
      label: "Slaughter floor"
    },
    ];
    this.nextTabs = [
      {
        index: 3,
        href: "#wr-spinal-cord",
        label: "Spinal cord"
      },
      {
        index: 5,
        href: "#wr-slaughter-floor",
        label: "slaughter floor gattle"
      },
      {
        index: 6,
        href: "#spinal-cord-sheath",
        label: "Visual Check Spinal Cord"
      },
      {
        index: 7,
        href: "#slaugther-movement-log",
        label: "Slaugther 30+ Movement Log"
      },
      {
        index: 8,
        href: "#checks-cleanig-towels",
        label: "Check Cleanings paper towels"
      },
      {
        index: 9,
        href: "#kosher-check-lists",
        label: "Quality assurance kosher"
      },
      {
        index: 10,
        href: "#rest-room",
        label: "Rest room"
      },
    ];
    this.prevTabs = [];
    this.clickActive(0);
  }

  /* ngAfterViewInit() {
     this.emitComponentHeigth(this.myIdentifier.nativeElement.clientHeight);
   }*/

  clickActive = (parm: number) => {
    for (let i = 0; i < this.active.length; i++) {
      this.active[i] = false;
    }
    this.active[parm] = true;
  }
  onKeydown = (event: any, target: any) => {
    console.warn("esto si funciona", event)
    const winRef = window.open('', target, '');
    // if the "target" window was just opened, change its url
    if (winRef!.location.href === 'about:blank') {
      winRef!.location.href = target;
    }
    return winRef;
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
