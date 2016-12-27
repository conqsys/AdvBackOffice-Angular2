import {
  Component, ElementRef, OnInit,
  ChangeDetectorRef
} from '@angular/core';
export class ListItem {
  constructor(public label: string, public value: any) { }
}

@Component({
  selector: 'ext:Toolbar',

  template: `
    <h3>Toolbar</h3>
    <ng-content></ng-content>
      <p-menubar [model]="items"></p-menubar>
      `
})


export class ToolbarComponent implements OnInit {
  private items: Array<Object> = [];

  constructor(private element: ElementRef, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'fa-file-o',
        items: [{
          label: 'New',
          icon: 'fa-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'fa-edit',
        items: [
          { label: 'Undo', icon: 'fa-mail-forward' },
          { label: 'Redo', icon: 'fa-mail-reply' }
        ]
      },
      {
        label: 'Help',
        icon: 'fa-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'fa-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'fa-gear',
        items: [
          {
            label: 'Edit',
            icon: 'fa-refresh',
            items: [
              { label: 'Save', icon: 'fa-save' },
              { label: 'Update', icon: 'fa-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'fa-phone',
            items: [
              { label: 'Delete', icon: 'fa-minus' }
            ]
          }
        ]
      },
      {
        label: 'Quit', icon: 'fa-minus'
      }
    ];
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

}
