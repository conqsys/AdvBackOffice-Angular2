import { Component,ElementRef,TemplateRef,ViewContainerRef,Compiler,OnInit,DoCheck,
    ChangeDetectorRef
     } from '@angular/core';

export class ListItem {
    constructor(public text:string,public value:any) {}
}

@Component({
    selector: 'my-combo',
  
 template: `<select [ngStyle]="{'width':props.Width.value+'px'}">
                    <option *ngFor='let item of items' value='{{item.value}}'> {{item.text}}
                    </option>
                </select>

                <div *ngFor="let item of props">
                {{item.name}} : {{item.value}}
                </div>
                `,
                
})


export class ComboBoxComponent implements DoCheck {
    constructor(private element:ElementRef,private cd:ChangeDetectorRef) {
        console.log(element);
        this.items=new Array<ListItem>();
     //   this.items.push(new ListItem("a","b"));
//         this.items.push(new ListItem("a1","b1"));
         this.innerElement=document.createElement('div');
         this.innerElement.attributes.value='combo';
    }

    public get props():any {
        return this.innerElement.querySelector('ext\\:ComboBox').attributes;
    }

    private innerElement:any; 
    ngOnInit(){
           console.log(this.element.nativeElement.innerHTML)
          
           this.innerElement.innerHTML=this.element.nativeElement.attributes.insideHtml.value;
         
        if(this.props.StoreID && this.props.StoreID.value.length>0) { 
          this.addOptions();        
        } else {
       
        }
           
        this.cd.markForCheck();
        //this.innerElement.parentNode.removeChild(this.innerElement);
    }
    ngDoCheck() {
        
        
    }
    public items:Array<any>;

    private addOptions(){
        let listItems=this.innerElement.querySelectorAll('ext\\:ListItem');
        listItems.forEach(element=>{
            this.items.push(new ListItem(element.attributes.Text.value,element.attributes.value.value));
        })

    }

}
