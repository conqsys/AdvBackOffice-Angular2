import {
  Component, ElementRef, OnInit,
  ChangeDetectorRef
} from '@angular/core';
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
    alert();
  }

}
