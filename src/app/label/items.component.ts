import { QueryList,ContentChildren,Directive,Component,ElementRef } from '@angular/core';

@Directive({ selector: 'Items' })
export class ItemsComponent {
      // @ContentChildren(ListItemComponent) listItems: QueryList<ListItemComponent>;
      items:Array<any>;
}
