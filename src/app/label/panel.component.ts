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
    <p-panel [style]="{'width':columnWidth+'px'}" header={{title}} 
    >
    <ng-content></ng-content>
    </p-panel> `
})


export class PanelComponent implements OnInit, AfterViewInit {
  labelWidth: any;
  columnWidth: number;
  panelId: any;
  items: any;
  title: any;
  panelHeight: number;
  bodyStyle: any;
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
    this.title = this.element.nativeElement.attributes.Title.value;
    this.bodyStyle = this.element.nativeElement.attributes.BodyStyle.value;
   this.columnWidth = 300;
    this.panelId = this.element.nativeElement.attributes.ID.value;
    this.panelHeight = this.element.nativeElement.attributes.Height.value;
    // this.items = this.element.nativeElement.querySelector('Items');
}


}
