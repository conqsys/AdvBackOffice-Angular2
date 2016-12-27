import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { Angular2DataTableModule } from 'angular2-data-table';
/* bootstrap components start */

import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

/* bootstrap components end */


/* sky-app components start */

import { AppComponent } from './app.component';
import { LabelComponent } from './label/label.component';
import { ComboBoxComponent } from './label/combobox.component';
import { DateFieldComponent } from './label/date-field.component';
import { LinkButtonComponent } from './label/linkButton.component';
import { CommonService } from './label/common.service';
import { Store } from './label/store.component';
import { MyPageComponent } from './mypage.component';
import { ButtonComponent } from './label/button.component';
import { ListenersComponent, ExtEvent, ClickEvent, ExtraParams, StoreParameter } from './label/listeners';
import { ExtBaseComponent } from './label/extbase';
import { DropdownModule, TooltipModule, CalendarModule} from 'primeng/primeng';


/* sky-app components end */

@NgModule({
  imports: [
    BrowserModule,
    CalendarModule,
    TooltipModule,
    DropdownModule,
    FormsModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule,
    Angular2DataTableModule,
    AlertModule
  ],
  declarations: [
    AppComponent,
    LinkButtonComponent,
    DateFieldComponent,
    LabelComponent,
    ComboBoxComponent,
    MyPageComponent,
    ButtonComponent,
    ExtraParams,
    StoreParameter,
    ListenersComponent,
    ClickEvent
  ],

  providers: [ExtEvent, ExtBaseComponent, CommonService, Store],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
