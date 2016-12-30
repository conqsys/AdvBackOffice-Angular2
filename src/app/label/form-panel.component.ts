import {
  Component, ElementRef, OnInit,
  ChangeDetectorRef, ContentChildren, QueryList, AfterViewInit, DoCheck
} from '@angular/core';
import { FieldSetComponent } from '../label/field-set.component';
import { ComboBoxComponent } from '../label/combobox.component';
import { PanelComponent } from '../label/panel.component';
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
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  @ContentChildren(ComboBoxComponent) comboBoxes: QueryList<ComboBoxComponent>;
  public fieldSet: Array<any> = [];
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

  ngAfterViewInit() {
  }

  public loadRecord(records): void {
    if (this.fieldSets) {
      this.fieldSets.toArray().forEach((field) => {
        field.loadRecord(records);
      });
    }
    if (this.panels) {
      this.panels.toArray().forEach((panel) => {
        panel.loadRecord(records);
      });
    }
  }
}

