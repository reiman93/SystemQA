import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepartmentService } from 'src/app/services/nomenclators/department.service';
import { DataGridComponent } from '../../../../components/data-grid/component/data-grid.component';
import { DialogBasicComponent } from '../../../../components/dialog-basic/dialog-basic.component';
import { SnakBarService } from '../../../../components/snack-bar/snak-bar.service';
//import { ConfigServiceService } from '../../../../services/config-service.service';

import { IDepartment } from '../../../../interfaces/entity-interfaces';
import { IObject } from '../../../../interfaces/IObject';



@Component({
  selector: 'app-list-equipment',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Output() emitter = new EventEmitter<Array<unknown>>();
  @Input() hideOptions = false;
  @ViewChild('tabla')
  tabla!: DataGridComponent;
  @ViewChild('action')
  action!: ElementRef;

  data!: IDepartment[];
  slectedRows = true;
  result!: Array<any>;
  dataPlayers!: Array<any>;

  containerHegith!: number;
  originHegith!: number;

  constructor(
    public service: DepartmentService,
    private router: Router,
    private snakBarService: SnakBarService,
    public dialog: MatDialog,
    //private serviceConfig: ConfigServiceService,
  ) { }

  @Output()
  emitSelectedValues(event: Array<unknown>) {
    this.emitter.emit(event);
  }

  ngOnInit(): void {
  }

  /* ngAfterViewChecked() {
     if (this.containerHegith != this.tabla.gridElem.nativeElement.clientHeight) {
       let aux = 0;
       if (this.containerHegith > this.tabla.gridElem.nativeElement.clientHeight) {
         aux = this.action.nativeElement.clientHeight + (this.containerHegith - this.tabla.gridElem.nativeElement.clientHeight);
       } else {
         aux = this.action.nativeElement.clientHeight + (this.tabla.gridElem.nativeElement.clientHeight - this.originHegith);
       }
       this.emitComponentHeigth(aux);
       this.containerHegith = this.tabla.gridElem.nativeElement.clientHeight;
     }
   }
 
   emitComponentHeigth(data: number) {
     this.serviceConfig.updateComponentHeigth(data);
   }*/
  ngAfterViewInit() {
    /* this.emitComponentHeigth(this.action.nativeElement.clientHeight);
     this.originHegith = this.tabla.gridElem.nativeElement.clientHeight;
     this.containerHegith = this.tabla.gridElem.nativeElement.clientHeight;*/
    this.tabla.selection.changed.subscribe((data: any) => {
      this.slectedRows = data.source.selected.length === 0 ? true : false;
      const toSend = new Array<any>();
      this.result.forEach((value, index) => {
        if (data.source.selected.indexOf(value.id) != -1) {
          toSend.push(value);
        }
      });
      this.emitSelectedValues(toSend);
    });
  }

  update(id: string) {
    this.router.navigate(['pages/nomenclators/department/edit', id]);
  }

  deleteMany() {
    const dialogRef = this.dialog.open(DialogBasicComponent, {
      data: {
        value: 1,
        message:
          'Are you sure you want to delete the selected item(s)?.',
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == 'accept') {
        const ids = new Array<string>();
        this.tabla.selection.selected.forEach((value, index) => {
          ids.push(value as string);
        });
        if (this.tabla.selection.selected.length != 0) {
          this.service
            .deleteMany(ids, 'deleteManyDepartment')
            .pipe(
              catchError((err) => {
                this.snakBarService.openSnackBar(err, '');
                return of([]);
              })
            )
            .subscribe(() => {
              this.snakBarService ?.openSnackBar(
                'The selected item(s) have been successfully deleted',
                ''
              );
              this.tabla ?.selection.clear();
              this.tabla.reloadData();
            });
        }
      }
    });
  }
}
