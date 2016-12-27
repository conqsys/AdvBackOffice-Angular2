import { ContentChild, OnInit, ViewContainerRef, Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ListenersComponent } from './listeners';


@Component({
  selector: 'ext:DateField',
  template: `
   <p-calendar [(ngModel)]="myDate" dateFormat="m-d-yy" [monthNavigator]="true" 
   [yearNavigator]="true" yearRange="2000:2030"></p-calendar>
  `,
})

export class DateFieldComponent implements OnInit {

  @ContentChild(ListenersComponent) listeners: ListenersComponent;
  listenerElement: any;
  myParent: any;
  es: any;
  date: Date = new Date();

  constructor(private element: ElementRef, private cd: ChangeDetectorRef, private vcRef: ViewContainerRef) {
    console.log(element);
    this.myParent = (<any>this.vcRef.injector)._view.context;
    console.log(this.myParent);
  }

  ngOnInit() {
  }

  public get props(): any {
    return this.element.nativeElement.attributes;
  }

  public get myDate(): Date {
    return this.date;
  }

  public set myDate(newValue: Date) {
    this.date = newValue;
  }

  public setValue(newValue: Date) {
    this.date = newValue;
  }
}
