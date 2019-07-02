import { DataService } from '../app/data.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DataResolverService
{

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot)
  {
    let id = route.paramMap.get('id');
    return this.dataService.getData(id);
  }
}