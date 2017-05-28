import { Component } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { 
  FormGroup, 
  FormControl,
  FormArray,
  Validators
} from '@angular/forms';

import { ServicioVidalegalService } from '../shared/services/serviciovidalegal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myFormVidaLegalHackaton: FormGroup;
  rastreoFormHackaton: FormGroup;
  username;
  email_cuenta_del_usuario;
  cel_de_contacto;
  valorServicioVidaLegal = 300000;
  files: FileList; 
  filestring: string; 
  
  typesServicios = [];
  // rastreoDelProceso;
  
  rastreoRespuesta = true;
  estadoDelProcesoDespuesDeTrackearlo;
  
  
  
  constructor(private serviciovidalegal: ServicioVidalegalService){
    this.myFormVidaLegalHackaton = new FormGroup({
      'country': new FormControl(),
      'city': new FormControl(),
        'client': new FormControl(),
       'email': new FormControl(),
       'description': new FormControl(),
        'evidence': new FormArray([
        
      ]),
      'phone': new FormControl(),
      'type': new FormControl('592a02450274940e15cddae4'),
      'price': new FormControl()
    });
    
    // formulario rastreo
     this.rastreoFormHackaton = new FormGroup({
      'code': new FormControl()
    });
    
    
    
    
    this.serviciovidalegal.traeTiposServiciosVidaLegal()
      .subscribe(tiposServicios => {
        console.log(tiposServicios);
        
        for(let i in tiposServicios){
          this.typesServicios.push(tiposServicios[i]);
        }
        
      });
  }
  
  
  onSubmit(){
    console.log(this.myFormVidaLegalHackaton);
    let pedido = this.myFormVidaLegalHackaton.value;
    this.serviciovidalegal.solicitarServicio(pedido)
      .subscribe(pedido=> {
        console.log(pedido);
        this.myFormVidaLegalHackaton.reset();     
      })
    
  }
  
  
  onRastreoProceso(){
    console.log(this.rastreoFormHackaton);
    let rastreo = this.rastreoFormHackaton.value;
    this.serviciovidalegal.rastreaProceso(rastreo)
      .subscribe(trackingRta => {
        console.log(trackingRta);
        this.rastreoRespuesta = false;
        this.estadoDelProcesoDespuesDeTrackearlo = trackingRta.status;
      })
  }
  
  
  getFiles(event) { 
        this.files = event.target.files; 
        console.log('aquiiii mira ya');
        console.log(event.target.files);
        
        
        for(var i = 0; i < event.target.files.length;i++){
          console.log('entrelooooolololo');
          var reader = new FileReader(); 
        reader.onload = this._handleReaderLoaded.bind(this); 
        reader.readAsBinaryString(this.files[i]); 
        }
        
        
       
    } 
 
    _handleReaderLoaded(readerEvt) { 
      
      console.log(readerEvt);
      
        var binaryString = readerEvt.target.result; 
        this.filestring = btoa(binaryString);  // Converting binary string data.
        // console.log(this.filestring);
        
        const control = new FormControl(this.filestring, Validators.required);
        (<FormArray>this.myFormVidaLegalHackaton.get('evidence')).push(control);
            console.log(this.myFormVidaLegalHackaton.get('evidence'));
        
  } 
  
  
  
  
}
