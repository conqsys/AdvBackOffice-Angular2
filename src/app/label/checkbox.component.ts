import {
  ContentChild, DoCheck, ViewContainerRef,
  Component, ElementRef, ChangeDetectorRef, AfterViewInit, OnChanges, OnInit
} from '@angular/core';
import { ListenersComponent } from './listeners';
@Component({
  selector: 'ext:Checkbox',
  template: `<ng-content></ng-content> {{checkBoxlabel}}<input type="checkbox" 
    [(ngModel)]="value" (click)="onChangeHandler($event)" [disabled]="isDisabled">`,
})

export class CheckboxComponent implements AfterViewInit, DoCheck, OnChanges, OnInit {
  @ContentChild(ListenersComponent) listeners: ListenersComponent;

  check: boolean = true;
  listenerElement: any;
  myParent: any;
  private ID: string = '';
  isChecked: boolean = false;
  checkBoxlabel: string;
  isDisabled:boolean=false
  constructor(private element: ElementRef,
    private cd: ChangeDetectorRef,
    private vcRef: ViewContainerRef) {
    this.myParent = (<any>this.vcRef.injector)._view.context;
  }

  ngAfterViewInit() {
    this.checkBoxlabel = this.element.nativeElement.attributes.FieldLabel.value;
  }
  ngOnInit() {
    this.listenerElement = this.element.nativeElement.querySelector('Listeners');
  }

  ngDoCheck() {
  }
  public get props(): any {
    return this.element.nativeElement.attributes;
  }
  public get value(): boolean {
    return this.isChecked;
  }

  public set value(newValue: boolean) {
    this.isChecked = newValue;
  }

  public getValue() {
    return this.value;
  }

  public setValue(newValue: boolean) {
    this.isChecked = newValue;
  }

  public setVisible(newValue: boolean){
    this.isDisabled=newValue;
  }

  ngOnChanges() {
    }

  onChangeHandler(element: any) {
    const elements = this.listenerElement.querySelector('Change')
    this.ID = this.element.nativeElement.attributes.ID.value;
    this.checkBoxlabel = this.element.nativeElement.attributes.FieldLabel.value;
    if (elements) {
      if (elements.attributes.Fn) {
        this.myParent[elements.attributes.Fn.value]();
      }
    } else {
      console.log('no Change handler for');
    }
  }
}
