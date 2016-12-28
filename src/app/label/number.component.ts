import {
  ContentChild, DoCheck,
  ViewContainerRef, Component, ElementRef, ChangeDetectorRef, AfterViewInit, OnChanges, OnInit
} from '@angular/core';
import { ListenersComponent } from './listeners';

@Component({

  selector: 'ext:NumberField',
  template: `<ng-content></ng-content> 
    <input type="number"  [(ngModel)]="value" (click)="onClickHandler($event)"  >`,


})

export class NumberComponent implements AfterViewInit, DoCheck, OnChanges, OnInit {
  @ContentChild(ListenersComponent) listeners: ListenersComponent;

  check: boolean = true;
  listenerElement: any;
  myParent: any;
  ID: string = '';
  textBoxValue: number;
  constructor(private element: ElementRef,
    private cd: ChangeDetectorRef,
    private vcRef: ViewContainerRef) {
    this.myParent = (<any>this.vcRef.injector)._view.context;
  }

  ngAfterViewInit() {

  }
  ngOnInit() {
    this.listenerElement = this.element.nativeElement.querySelector('Listeners');
  }

  ngDoCheck() {
  }
  public get props(): any {
    return this.element.nativeElement.attributes;
  }
  public get value(): number {
    return this.textBoxValue;
  }

  public set value(newValue: number) {
    this.textBoxValue = newValue;
  }

  public getValue() {
    return this.value;
  }

  public setValue(newValue: number) {
    this.textBoxValue = newValue;
  }

  ngOnChanges() {
    // alert('changes')

  }

  onClickHandler(element: any) {
    this.textBoxValue = Math.round(this.textBoxValue * 100) / 100;
    let elements: any;
    if (this.listenerElement.querySelector('Blur')) {
      elements = this.listenerElement.querySelector('Blur');
    } else if (this.listenerElement.querySelector('Click')) {
      elements = this.listenerElement.querySelector('Click');
    } else if (this.listenerElement.querySelector('Show')) {
      elements = this.listenerElement.querySelector('Show');
    }
    this.ID = this.element.nativeElement.attributes.ID.value;
    if (elements) {
      if (elements.attributes.Fn) {
        this.myParent[elements.attributes.Fn.value]();
      }
    } else {
      console.log('no Change handler for');
    }
  }
}
