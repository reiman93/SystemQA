import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import conf from '../../assets/json/conf.json';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
  })
};


import { ISampleRequestForms } from '../interfaces/entity-interfaces';
import { IPaginateDTO } from '../components/data-grid/component/interface/paginate.interface';
import { ISearchFilter } from '../components/data-grid/component/interface/search-filter.interface';
import { ISorting } from '../components/data-grid/component/interface/sorting.interface';
import { ConfigServiceService } from "./config-service.service";

@Injectable({
  providedIn: 'root',
})
export class SampleRequestFormService {
  url = conf.url;
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
    return this.httpClient.post<any>( this.enviroment.config.url + 'storeSampleRequestForms',
      page).pipe(map((data): unknown => {
        return (
          data.data as {
            sample_request_forms: ISampleRequestForms[];
          }
        ).sample_request_forms;
      }))
  }

  get(data: any, service: string): Observable<any> {
    return this.httpClient.get<any>( this.enviroment.config.url + service, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }
  create(data: any, user: any, service: string): Observable<any> {
    return this.httpClient.post<any>( this.enviroment.config.url + service, {
      name: data.name,
      date: data.date,
      state_analisys_id: data.analisys_state,
      analysis_types_id: data.analysis_types,
      areas_id: data.area,
      sample_forms_id: data.sample_forms,
      laboratories_id: data.laboratory,
      user_id: user,
    }, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }
  update(data: any, service: string): Observable<any> {
    return this.httpClient.put<any>( this.enviroment.config.url + service + '/' + data.id,
      data
      , httpOptions).pipe(map((resp: any) => {
        return resp;
      }));
  }

  delete(data: any, service: string): Observable<any> {
    return this.httpClient.delete<any>( this.enviroment.config.url + service + '/' + data[0], httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }

  deleteMany(ids: any, service: string): Observable<any> {
    return this.httpClient.post<any>( this.enviroment.config.url + service, { ids }, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }

  addPreOperation(data: any, service: string): Observable<any> { //Service to create pre operation
    return this.httpClient.post<any>( this.enviroment.config.url + service, {
      aceptable: data.aceptable,
      notes: data.notes,
      areas_id: data.area,
      deficiency_types_id: data.deficiency,
      janitors_id: data.janitor,
      relapse_actions_id: data.action
    }, httpOptions).pipe(map((resp: any) => {
      return resp;
    }));
  }
}
