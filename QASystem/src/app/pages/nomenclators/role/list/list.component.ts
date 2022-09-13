import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataGridComponent } from '../../../../components/data-grid/component/data-grid.component';
import { DialogBasicComponent } from '../../../../components/dialog-basic/dialog-basic.component';
import { SnakBarService } from '../../../../components/snack-bar/snak-bar.service';

import { IAnalysisType } from '../../../../interfaces/entity-interfaces';
import { IObject } from '../../../../interfaces/IObject';

import { NomenclatorsService } from '../../../../services/nomenclators/nomenclators.service';

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

  data!: IAnalysisType[];
  slectedRows = true;
  result!: Array<any>;
  dataPlayers!: Array<any>;


  constructor(
    public service: NomenclatorsService,
    private router: Router,
    private snakBarService: SnakBarService,
    public dialog: MatDialog
  ) { }

  @Output()
  emitSelectedValues(event: Array<unknown>) {
    this.emitter.emit(event);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.service.findAllPagination().subscribe({
      next: (result: any) => {
        const este = result as IObject;
        this.result = este.items;
    
        this.result.forEach((value, index) => {
        
        })
      },
      error: (error: any) => {
    
        this.snakBarService.openSnackBar(
          'Error al obtener los datos.',
          'cerrar',
          {},
          'error'
        )
      },
      complete: () => {}
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

  update(id: string) {
    this.router.navigate(['pages/anaysis-type/edit', id]);
  }

  deleteMany() {
    const dialogRef = this.dialog.open(DialogBasicComponent, {
      data: {
        value: 1,
        message:
          '¿Está seguro que desea eliminar el(los) elemento(s) seleccionado(s)?.',
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
            .deleteMany(ids, 'deleteManyAnalysisType')
            .pipe(
              catchError((err) => {
                this.snakBarService.openSnackBar(err, '');
                return of([]);
              })
            )
            .subscribe(() => {
              if (ids.length > 1) {
                this.snakBarService ?.openSnackBar(
                  'Los elementos seleccionados han sido eliminados satisfactoriamente',
                  ''
                );
              } else {
                this.snakBarService ?.openSnackBar(
                  'El elemento ha sido eliminado satisfactoriamente',
                  ''
                );
              }
              this.tabla ?.selection.clear();
              this.tabla.reloadData();
            });
        }
      }
    });
  }
}
