import { ContentChild, ViewContainerRef, Component,
   ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ext:Label',
  template: `<ng-content></ng-content> <span pTooltip={{tooltipMsg}}>{{content}}</span>`,
})
export class LabelComponent implements AfterViewInit {
  labels: any;
  tooltips: any;
  tooltipListner: any;
  tooltipMsg: any;

  constructor(
    private element: ElementRef,
    private cd: ChangeDetectorRef,
    private vcRef: ViewContainerRef
  ) {
    this.content = 'Label test';
  }

  private _content: string;
  public get content(): string {
    return this._content;
  }

  public set content(newValue: string) {
    this._content = newValue;
  }
   
   public get props(): any {
    return this.element.nativeElement.attributes;
  }

  ngAfterViewInit() {
    
    
        this.tooltips = this.element.nativeElement.querySelector('ToolTips');
    if (this.tooltips) {
      this.tooltipListner = this.tooltips.querySelector('ToolTip');
      if (this.tooltipListner) {
        this.tooltipMsg = this.tooltipListner.attributes.Html.value;
        
      }
    }
  }
}

