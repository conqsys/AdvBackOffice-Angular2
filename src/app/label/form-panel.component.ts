import {
  Component, ElementRef, OnInit,
  ChangeDetectorRef, ContentChildren, QueryList, AfterViewInit, DoCheck
} from '@angular/core';
import { FieldSetComponent } from '../label/field-set.component';
import { ComboBoxComponent } from '../label/combobox.component';
export class ListItem {
  constructor(public label: string, public value: any) { }
}

@Component({
  selector: 'ext:FormPanel',

  template: `
    <h3>FormPanel</h3>
    <ng-content></ng-content>
    <div>
      
    </div>`
})


export class FormPanelComponent implements OnInit, AfterViewInit {
  @ContentChildren(FieldSetComponent) fieldSets: QueryList<FieldSetComponent>;
  @ContentChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
  public fieldSet: Array<any> = [];
  constructor(private element: ElementRef, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log(this.element.nativeElement.innerHTML);
  }

  ngDoCheck() {

    //var a = this.fieldSets;
  }

  public get action(): string {
    return '';
  }

  public set action(newValue: string) {
  }

  public setValue(newValue: string) {
  }

  public get props(): any {
    return this.element.nativeElement.attributes;
  }

  ngAfterViewInit() {
    //console.log(this.comboBoxes);
    // let self = this;
    // if (this.comboBoxes) {
    //     this.comboBoxes.toArray().forEach(comp => {
    //         Object.defineProperty(self, comp.props.ID.value, {
    //             writable: true,
    //             enumerable: true,
    //             configurable: true,
    //             value: comp
    //         });
    //     });
    // }
  }

  public loadRecord(records): void {

    var a = this.fieldSets.toArray().forEach((comp) => {
      comp.loadRecords(records);
    });

    // this.fieldSet = this.element.nativeElement.querySelectorAll('FieldSet');
    // if (this.fieldSet) {
    //   this.fieldSet.forEach((req) => {
    //     this.fieldSets.loadRecords(records);
    //   });
    // }
  }
  // switch (this.element.nativeElement) {
  //   case this.element.nativeElement.querySelectorAll('FieldSet'):
  //     let fieldSet = this.element.nativeElement.querySelectorAll('FieldSet');
  //     if (fieldSet) {
  //       fieldSet.map((req) => {
  //         this.fieldSets.loadRecord(records);
  //       });
  //     }
  //     break;
  //   case this.element.nativeElement.querySelectorAll('Panel'):

  //     break;
  //   default:
  // }
}

