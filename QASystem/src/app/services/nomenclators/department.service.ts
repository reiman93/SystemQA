import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
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


import { IDepartment } from './../../interfaces/entity-interfaces';
import { IPaginateDTO } from './../../components/data-grid/component/interface/paginate.interface';
import { ISearchFilter } from './../../components/data-grid/component/interface/search-filter.interface';
import { ISorting } from './../../components/data-grid/component/interface/sorting.interface';
import { ConfigServiceService } from "../config-service.service";

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  url = conf.url;
  constructor(private httpClient: HttpClient, private enviroment: ConfigServiceService) { }

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
    return this.httpClient.post<any>(this.enviroment.config.url + 'storeDepartment',
      page).pipe(map((data): unknown => {
        return (
          data.data as {
            department: IDepartment[];
          }
        ).department;
      }))
  }

  get(id: any, service: string): Observable<any> {
    return this.httpClient.get<any>(this.enviroment.config.url + service + '/' + id, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }
  getAll(service: string): Observable<any> {
    return this.httpClient.get<any>(this.enviroment.config.url + service, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }

  create(data: any, service: string): Observable<any> {
    return this.httpClient.get<any>(this.enviroment.config.url + service, {}).pipe(map((resp: any) => {
      return resp;
    }));
  }

  delete(data: any, service: string): Observable<any> {
    return this.httpClient.delete<any>(this.enviroment.config.url + service + '/' + data[0], httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }

  deleteMany(ids: any, service: string): Observable<any> {
    return this.httpClient.post<any>(this.enviroment.config.url + service, { ids }, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }

}
