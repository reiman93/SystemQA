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
import { DataGridService } from 'src/app/components/data-grid/component/service/data-grid.service';
import { DataGridComponent } from '../../../components/data-grid/component/data-grid.component';
import { DialogBasicComponent } from '../../../components/dialog-basic/dialog-basic.component';
import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';
//import { ConfigServiceService } from '../../../services/config-service.service';

import { INomenclators } from '../../../interfaces/entity-interfaces';
import { IObject } from '../../../interfaces/IObject';

import { SampleRequestFormService } from '../../../services/sample-request-from.service';

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
  @ViewChild('sample')
  sample!: ElementRef;

  data!: INomenclators[];
  slectedRows = true;
  result!: Array<any>;
  dataPlayers!: Array<any>;

  foto: string[] = [];

  constructor(
    public service: SampleRequestFormService,
    private router: Router,
    private snakBarService: SnakBarService,
    public dialog: MatDialog,
    private dataGridService: DataGridService,
  ) { }

  @Output()
  emitSelectedValues(event: Array<unknown>) {
    this.emitter.emit(event);
  }

  ngOnInit(): void {
    this.dataGridService.dataGrid.subscribe((result: any) => {
      if (result instanceof Array) {
        result.forEach((value: any, index: any) => {
          if (!value.users) {
            this.foto[value.id] = "assets/img/user.png";
          } else {
            this.foto[value.id] = value.users.foto ? value.users.foto : "assets/img/user.png";
          }
        })
      }
    });
  }
  /*emitComponentHeigth(data: number) {
    this.serviceConf.updateComponentHeigth(data);
  }*/
  ngAfterViewInit() {
    //  this.emitComponentHeigth(this.sample.nativeElement.clientHeight + 10);
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
    this.router.navigate(['pages/simple-request-form/edit', id]);
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
            .deleteMany(ids, 'deleteManySampleRequestForms')
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
