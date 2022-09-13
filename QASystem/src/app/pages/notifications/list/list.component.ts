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
import { NotificationsService } from 'src/app/services/nomenclators/notifications.service';
import { DataGridComponent } from '../../../components/data-grid/component/data-grid.component';
import { DialogBasicComponent } from '../../../components/dialog-basic/dialog-basic.component';
import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';
import { DataGridService } from 'src/app/components/data-grid/component/service/data-grid.service';
//import { ConfigServiceService } from '../../../services/config-service.service';

import { IArea } from '../../../interfaces/entity-interfaces';


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

  data!: IArea[];
  slectedRows = true;
  result!: Array<any>;
  dataPlayers!: Array<any>;
  stateClass: string[] = [];

  @ViewChild('notif')
  ccp!: ElementRef;

  constructor(
    public service: NotificationsService,
    private dataGridService: DataGridService,
    private router: Router,
    private snakBarService: SnakBarService,
    public dialog: MatDialog,
  ) { }

  @Output()
  emitSelectedValues(event: Array<unknown>) {
    this.emitter.emit(event);
  }
  emitNotifUpdate(event: boolean) {
    this.service.updateNotif();
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataGridService.dataGrid.subscribe((result: any) => {
      result.forEach((value: any, index: any) => {
        if (value.recived == false) {
          this.stateClass[value.id] = "badge rounded-pill bg-warning text-dark";
        } else
          if (value.recived == true) {
            this.stateClass[value.id] = "badge rounded-pill bg-success text-dark";
          }
      })
    });

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

  checkMany() {
    const dialogRef = this.dialog.open(DialogBasicComponent, {
      data: {
        value: 1,
        message:
          'Are you sure you want to check the selected item(s)?.',
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
            .deleteMany(ids, 'checkManyNotifications')
            .pipe(
              catchError((err) => {
                this.snakBarService.openSnackBar(err, '');
                return of([]);
              })
            )
            .subscribe(() => {
              this.snakBarService?.openSnackBar(
                'The selected item(s) have been successfully checed',
                ''
              );
              this.tabla?.selection.clear();
              this.tabla.reloadData();
            });
        }
      }
    });
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
            .deleteMany(ids, 'deleteManyNotifications')
            .pipe(
              catchError((err) => {
                this.snakBarService.openSnackBar(err, '');
                return of([]);
              })
            )
            .subscribe(() => {
              this.snakBarService?.openSnackBar(
                'The selected item(s) have been successfully deleted',
                ''
              );
              this.tabla?.selection.clear();
              this.tabla.reloadData();
            });
        }
      }
    });
  }
}
