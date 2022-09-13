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
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataGridComponent } from '../../../components/data-grid/component/data-grid.component';

import { DialogFormComponent } from '../../../components/dialog-form/dialog-form.component';
import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';

import { PreOperationalService } from '../../../services/pre-operational.service';
import { IArea } from '../../../interfaces/entity-interfaces';
import { IObject } from '../../../interfaces/IObject';

import { AreaService } from '../../../services/nomenclators/area.service';
import { JanitorService } from '../../../services/nomenclators/janitor.service';
import { ActionsService } from '../../../services/nomenclators/actions.service';
import { NotificationsService } from '../../../services/nomenclators/notifications.service';
import { DefencyTypeService } from '../../../services/nomenclators/defency-type.service';
import { DataGridService } from 'src/app/components/data-grid/component/service/data-grid.service';
//import { ConfigServiceService } from '../../../services/config-service.service';

import { DialogBasicComponent } from '../../../components/dialog-basic/dialog-basic.component';

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
  @ViewChild('pre')
  pre!: ElementRef;

  data!: IArea[];
  slectedRows = true;
  result!: Array<any>;
  dataJanitor!: Array<any>;
  dataAction!: Array<any>;
  dataDeficiency!: Array<any>;
  disabled: Array<boolean> = [];

  resetField!: any;

  fields: Array<any> = [{
    label: "Notes",
    model: "",
    ref: "notes",
    class: "col-12",
    type: "text",
  }]

  stateClass: string[] = [];
  foto: string[] = [];

  constructor(
    private dataGridService: DataGridService,
    public service: PreOperationalService,
    public servicioArea: AreaService,
    public servicioJanitor: JanitorService,
    public servicioAction: ActionsService,
    public servicioDeficiency: DefencyTypeService,
    public servicioNotificacion: NotificationsService,
    private router: Router,
    private snakBarService: SnakBarService,
    public dialog: MatDialog,
  ) {
  }

  @Output()
  emitSelectedValues(event: Array<unknown>) {
    this.emitter.emit(event);
  }
  emitNotifUpdate(event: boolean) {
    this.servicioNotificacion.updateNotif();
  }

  ngOnInit(): void {
    this.getAllJanitor();
    this.getAllDeficiency();
    this.getAllAction();

    this.dataGridService.dataGrid.subscribe((result: any) => {
      if (result instanceof Array) {
        result.forEach((value: any, index: any) => {
          if (value.state == "Disapproved") {
            this.stateClass[value.id] = "badge rounded-pill bg-danger text-dark";
          } else
            if (value.state == "Approved") {
              this.stateClass[value.id] = "badge rounded-pill bg-success text-dark";
            } else {
              this.stateClass[value.id] = "badge rounded-pill bg-warning text-dark";
            }
          if (!value.users) {
            this.foto[value.id] = "assets/img/user.png";
          } else {
            this.foto[value.id] = value.users.foto ? value.users.foto : "assets/img/user.png";
          }
          //this.resetField[value.id] = null;
        })
      }
    });
  }
  getAllJanitor() {
    this.servicioJanitor.getAll('janitor')
      .subscribe({
        next: (data: any) => {
          this.dataJanitor = data.data;
          this.fields.push({
            label: "Janitor",
            model: "",
            ref: "janitor",
            type: "combobox",
            class: "col-12",
            data: this.dataJanitor
          })
        },
        error: (error: any) => {
          this.snakBarService.openSnackBar(
            'Error getting data.',
            'cerrar',
            {},
            'error'
          )
        },
        complete: () => { }
      }
      );
  }
  getAllAction() {
    this.servicioAction.getAll('relapse_action')
      .subscribe({
        next: (data: any) => {
          this.dataAction = data.data;
          this.fields.push({
            label: "Corrective actions",
            model: "",
            ref: "action",
            type: "combobox",
            class: "col-12",
            data: this.dataAction
          })
        },
        error: (error: any) => {
          this.snakBarService.openSnackBar(
            'Error getting data.',
            'cerrar',
            {},
            'error'
          )
        },
        complete: () => { }
      }
      );
  }
  getAllDeficiency() {
    this.servicioDeficiency.getAll('deficiency_type')
      .subscribe({
        next: (data: any) => {
          this.dataDeficiency = data.data;
          this.fields.push({
            label: "Deficiency type",
            model: "",
            ref: "deficiency",
            type: "combobox",
            class: "col-12",
            data: this.dataDeficiency
          })
        },
        error: (error: any) => {
          this.snakBarService.openSnackBar(
            'Error getting data.',
            'cerrar',
            {},
            'error'
          )
        },
        complete: () => { }
      }
      );
  }

  /*  emitComponentHeigth(data: number) {
      this.serviceConfig.updateComponentHeigth(data);
    }*/

  ngAfterViewInit(): void {
    //  this.emitComponentHeigth(this.pre.nativeElement.clientHeight + 10);
    this.tabla.selection.changed.subscribe((data: any) => {
      data.added.forEach((val: any) => {
        this.disabled[val] = false;
      })
      data.removed.forEach((val: any) => {
        this.disabled[val] = true;
      });
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

  createPreOperation(event: any, row: any) {
    const dialogRef = this.dialog.open(DialogBasicComponent, {
      data: {
        value: 1,
        message:
          'Are you sure want set ' + event.value + ' this area?.',
      },
    });
    let notes = (row.state != "Disapproved") ? "Aceptable." : "Acceptable with previous incidents.";
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == 'accept') {
        let data = {
          id: row.id,
          aceptable: true,
          state: event.value,
          notes: notes,
          date: row.date,
          user: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        }
        this.service.addPreOperation(data, 'pre_operational').subscribe(
          {
            next: (result: any) => {
              this.snakBarService.openSnackBar('Successfully updated', 'Close');
              this.servicioArea.updateState(data, 'updateState').subscribe(
                {
                  next: (result: any) => {
                    // this.snakBarService.openSnackBar('Creado correctamente', 'Cerrar');
                    this.tabla.reloadData();
                    this.emitNotifUpdate(true);
                  },
                  error: (error: any) => {
                    /* this.snakBarService.openSnackBar(
                       'Error al crear los datos.',
                       'cerrar',
                       {},
                       'error'
                     );*/
                  },
                  complete: () => {

                  }
                }
              )
            },
            error: (error: any) => {
              this.snakBarService.openSnackBar(
                'Error creating data.',
                'cerrar',
                {},
                'error'
              );
            },
            complete: () => { }
          }
        );
      } else {
        this.clearRadioField(row.id)
      }
    });
  }
  showModal(row: any) {
    this.clearModalFields();
    //   if (event.checked) {
    const dialogFormRef = this.dialog.open(DialogFormComponent, {
      data: {
        title: row.name + ':',
        fields: this.fields,
      },
    });

    dialogFormRef.afterClosed().subscribe((result: any) => {
      let validModal = true;
      if (result) {
        var data: any = {
          aceptable: false,
          id: row.id,
          date: row.date,
          user: JSON.parse(sessionStorage.getItem('currentUser')!).username,
        }
          ;
        result.forEach((value: any, index: any) => {
          Object.assign(data, { [value.ref]: value.model });
          if (!value.model) {
            validModal = false;
          }
        });
        if (validModal) {
          this.service.addPreOperation(data, 'pre_operational').subscribe(
            {
              next: (result: any) => {
                this.snakBarService.openSnackBar('Successfully updated', 'Close');
              },
              error: (error: any) => {
                this.snakBarService.openSnackBar(
                  'Error creating data.',
                  'cerrar',
                  {},
                  'error'
                );
              },
              complete: () => {
                let data = {
                  name: "System Info:",
                  recived: false,
                  user: JSON.parse(sessionStorage.getItem('currentUser')!).username,
                  description: row.name + " was detected with problems.Recheck will be scheduled for 30 to 50 minutes.",
                }
                this.servicioNotificacion.create(data, 'notification').subscribe(
                  {
                    next: (result: any) => {
                      // this.snakBarService.openSnackBar('Creado correctamente', 'Cerrar');
                      this.emitNotifUpdate(true);
                    },
                    error: (error: any) => {
                      /* this.snakBarService.openSnackBar(
                         'Error al crear los datos.',
                         'cerrar',
                         {},
                         'error'
                       );*/
                    },
                    complete: () => {

                    }
                  }
                )
                let dataAr = {
                  id: row.id,
                  state: 'Disapproved',
                  notes: 'Disapproved ' + row.name,
                }
                this.servicioArea.updateState(dataAr, 'updateState').subscribe(
                  {
                    next: (result: any) => {
                      // this.snakBarService.openSnackBar('Creado correctamente', 'Cerrar');
                      this.tabla.reloadData();
                      this.emitNotifUpdate(true);
                    },
                    error: (error: any) => {
                      /* this.snakBarService.openSnackBar(
                         'Error al crear los datos.',
                         'cerrar',
                         {},
                         'error'
                       );*/
                    },
                    complete: () => {

                    }
                  }
                )
              }
            }
          );
        } else {
          console.warn("ENTRO EN ELSTE ELSE!!!!")
          this.snakBarService.openSnackBar(
            'Required fields.',
            'cerrar',
            {},
            'error'
          )
          this.clearRadioField(row.id);

        }
      } else {
        this.clearRadioField(row.id)
      }
    });
    // }
  }
  clearModalFields() {
    this.fields.forEach((val, index) => {
      val.model = "";
    });
  }
  clearRadioField(id: any) {
    //console.warn("este entra akii", this.resetField)
    this.resetField = null;

  }

  radioChange(event: any) {
  }
}
