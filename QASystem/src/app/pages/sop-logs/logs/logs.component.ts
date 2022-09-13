import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { DataGridComponent } from '../../../components/data-grid/component/data-grid.component';
import { SopLogsService } from '../../../services/sop-logs.service';

@Component({
  selector: 'app-logs-equipment',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  @Output() emitter = new EventEmitter<Array<unknown>>();

  @Input() hideOptions = false;
  @ViewChild('tabla')
  tabla!: DataGridComponent;

  constructor(
    public service: SopLogsService
  ) {
  }


  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

}
