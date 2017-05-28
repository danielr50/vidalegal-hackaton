import { Injectable, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';


import { Observable } from 'rxjs/Observable';


@Injectable()
export class ServicioVidalegalService implements OnInit{ 

    
    // solicitar servicios vida legal
    private solicitarServiciosURL: string = 'http://159.203.88.185:5433/api/v1/services';
    
    
    // tipos de servicio posibles vida legal
     private tiposServiciosURL: string = 'http://159.203.88.185:5433/api/v1/types';
     
    //  rastreo proceso
    private rastreoProcesoURL: string = 'http://159.203.88.185:5433/api/v1/services/status/';
     
     
    
    // 1 paso para hacer observables - observable source
    // private userCreatedSource = new Subject<User>();
    // private userDeletedSource = new Subject();
    
    // 2 paso para crear observables - observable stream 
    // userCreated$ = this.userCreatedSource.asObservable();
    // userDeleted$ = this.userDeletedSource.asObservable();
    
    constructor(private http: Http){
        // this.tokendesdeInicio = localStorage.getItem('auth_token');
        // console.log(this.tokendesdeInicio);
        
    }
    
    // para traer tipos de servicios que ofrecemos
    traeTiposServiciosVidaLegal(){
        return this.http.get(this.tiposServiciosURL)
            .map(tiposServicios => tiposServicios.json())
            .catch(this.handleError);
    }
    
    
    // rastreo Proceso
    rastreaProceso(formRastreo: any): Observable<Response>{
         console.log('se manda solicitud rastreo al api de test vidalegal');
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(this.rastreoProcesoURL+formRastreo.code, { headers: headers })
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    
    
    // para solicitar un servicio
    solicitarServicio(formSolicitud:any):Observable<Response>{
        console.log('se manda servicio al api de test vidalegal');
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.solicitarServiciosURL, formSolicitud, { headers: headers })
            .map((response: Response) => {
                console.log(response);
            })
            .catch(this.handleError);
    }
    
     private handleError(err){
        let errMessage: string;
        
        if(err instanceof Response){
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errMessage = `${err.status} – ${error.statusText} || ''} ${error}`;
        } else {
            errMessage = err.message ? err.message : err.toString();
        }
        return Observable.throw(errMessage);
    }
    
    
    
    ngOnInit(){
        
    }
    
}