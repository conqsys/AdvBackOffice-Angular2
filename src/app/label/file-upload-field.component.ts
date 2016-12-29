import {
  Component, ElementRef, OnInit,
  ChangeDetectorRef
} from '@angular/core';
export class ListItem {
  constructor(public label: string, public value: any) { }
}

import { CommonService } from './common.service';

@Component({
  selector: 'ext:FileUploadField',
  template: `
    <h3>FileUploadField</h3>
    <ng-content></ng-content>
<p-growl [value]="msgs"></p-growl>
    
<p-fileUpload name="demo[]"  (onSelect)='onSelect($event)' 
        multiple="multiple" accept="image/*" maxFileSize="1000000">
    <template pTemplate type="content">
        <ul *ngIf="uploadedFiles.length">
            <li *ngFor="let file of uploadedFiles">{{file.name}} - {{file.size}} bytes</li>
        </ul>
    </template>        
</p-fileUpload>
    
    `
})


export class FileUploadFieldComponent implements OnInit {
  demo = []
  msgs: Array<any> = [];

  uploadedFiles: any[] = [];

  constructor(
    private element: ElementRef,
    private cd: ChangeDetectorRef,
    private commonService: CommonService) {
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

  // msgs: Message[];

  //   uploadedFiles: any[] = [];

  // onUpload(event) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  //   this.msgs = [];
  //   this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
  // }
  onSelect(event) {
    alert(event)
  }
  // public onUpload(event) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  //   this.commonService.upload().subscribe(res => {
  //     let result = res;
  //     console.log(result);
  //   });
  //   this.msgs = [];
  //   this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
  // }

}

