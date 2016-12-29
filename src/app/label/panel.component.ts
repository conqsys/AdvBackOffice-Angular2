import {
  Component, ElementRef, OnInit,
  ChangeDetectorRef, AfterViewInit
} from '@angular/core';
export class ListItem {
  constructor(public label: string, public value: any) { }
}

@Component({
  selector: 'ext:Panel',

  template: `
    <p-panel [style]="{'width':columnWidth+'px'}" 
    >
    <ng-content></ng-content>
    </p-panel> `
})


export class PanelComponent implements OnInit, AfterViewInit {
  labelWidth: any;
  columnWidth: number = 300;
  panelId: any;
  items: any;
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
    // this.labelWidth = this.element.nativeElement.attributes.LabelWidth.value;
    // this.columnWidth = this.element.nativeElement.attributes.ColumnWidth.value;
   // this.columnWidth = 120;
    // this.panelId = this.element.nativeElement.attributes.ID.value;
    // this.items = this.element.nativeElement.querySelector('Items');
}


}
