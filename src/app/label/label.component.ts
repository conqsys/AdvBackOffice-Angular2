import { Component } from '@angular/core';

@Component({
  selector: 'ext:Label',
  template: `<span>{{content}}</span>`,
})
export class LabelComponent {

  constructor() {
    this.content = 'Label test';
  }

  private _content: string;

  public get content(): string {
    return this._content;
  }

  public set content(newValue: string) {
    this._content = newValue;
  }
}