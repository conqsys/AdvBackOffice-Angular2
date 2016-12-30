import {
  Component, ElementRef, OnInit,
  ChangeDetectorRef,ContentChildren,QueryList
} from '@angular/core';
import { ComboBoxComponent } from '../label/combobox.component';
export class ListItem {
  constructor(public label: string, public value: any) { }
}

@Component({
  selector: 'ext:FieldSet',
  template: `
    <h3>FieldSet</h3>
    <ng-content></ng-content>
    `
})


export class FieldSetComponent implements OnInit {
  @ContentChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
  constructor(private element: ElementRef, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log(this.element.nativeElement.innerHTML);
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

  public loadRecords(records): any {
    var a = this.comboBoxes.toArray().forEach((comp) => {
      comp.getValue();
    });
  }

}
