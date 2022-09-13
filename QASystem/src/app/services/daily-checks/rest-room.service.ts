import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import conf from '../../../assets/json/conf.json';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
  })
};


import { IPreOperation } from '../../interfaces/entity-interfaces';
import { IPaginateDTO } from '../../components/data-grid/component/interface/paginate.interface';
import { ISearchFilter } from '../../components/data-grid/component/interface/search-filter.interface';
import { ISorting } from '../../components/data-grid/component/interface/sorting.interface';
import { ConfigServiceService } from "../config-service.service";

@Injectable({
  providedIn: 'root',
})
export class RestRoomService {
  constructor(private httpClient: HttpClient,private enviroment: ConfigServiceService) { }

  findAllPagination(
    skip?: number,
    take?: number | undefined,
    sort?: ISorting | undefined,
    dataFilter?: ISearchFilter[],
  ): Observable<unknown> {
    const page: IPaginateDTO = {
      skip: skip,
      take: take,
      sortField: sort,
      orSearchFields: dataFilter,
      select: [],
    };
    return this.httpClient.post<any>( this.enviroment.config.url + 'storeRestRoom',
      page).pipe(map((data): unknown => {
        return (
          data.data as {
            rest_room: IPreOperation[];
          }
        ).rest_room;
      }))
  }

  create(data: any, service: string): Observable<any> {
    return this.httpClient.post<any>( this.enviroment.config.url + service, data, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }

}
