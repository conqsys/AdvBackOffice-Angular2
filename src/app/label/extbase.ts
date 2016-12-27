import { Injectable,OnInit,Directive,Component,ElementRef,AfterViewInit } from '@angular/core';
@Injectable()
export class ExtBaseComponent implements AfterViewInit, OnInit {
    //  constructor(protected element:ElementRef) {       
    //   }

    //   public get props() {
    //       return this.element.nativeElement.attributes;
    //   }
      ngOnInit() {
          
      }
    ngAfterViewInit() {
        
    }


} 