import {
  Component, ElementRef, OnInit,
  ChangeDetectorRef, ContentChildren, QueryList
} from '@angular/core';
import { ComboBoxComponent } from '../label/combobox.component';
import { TextBoxComponent } from '../label/textbox.component';
import { FormPanelComponent } from '../label/form-panel.component';
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
  @ContentChildren(TextBoxComponent) textBoxes: QueryList<TextBoxComponent>;
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

  public loadRecord(records): any {

    this.comboBoxes.toArray().forEach((comp) => {
      if (records.data[comp.selectedValue]) {
        comp.setValue(records.data[comp.selectedValue]);
      }
    });

    this.textBoxes.toArray().forEach((text) => {
      if (records.data[text.name]) {
        text.setValue(records.data[text.name]);
      }
    });
  }
}
