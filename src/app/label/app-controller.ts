import { ElementRef,ViewContainerRef } from '@angular/core';
import { Store } from './store.component';

export class AppController {
    stores = Store[0];
   
    constructor(private element,private myParent) {
     
    }

    initialize() {
       
    }

}
