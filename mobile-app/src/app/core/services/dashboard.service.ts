import { Injectable, EventEmitter } from '@angular/core';
import { RestService } from './rest-service.service';
import { Observable, of, interval } from 'rxjs';
import { FileNode } from '../models/file-node';
import { AppConfig } from '../app-config';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class DashboardService {


  constructor( private _http: RestService ) { }


  public getClientInformations(): Observable<Array<FileNode>> {
    const data = JSON.stringify( AppConfig.userData )

    const dataObject = JSON.parse( data );

    return of( this.buildFileTree( dataObject, 0 ) );
  }


  buildFileTree( obj: { [key: string]: any }, level: number ): FileNode[] {
    return Object.keys( obj ).reduce<FileNode[]>( ( accumulator, key ) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if ( value != null ) {
        if ( typeof value === 'object' ) {
          node.children = this.buildFileTree( value, level + 1 );
        }
        else {
          node.type = value;
        }
      }

      return accumulator.concat( node );
    }, [] );
  }
}
